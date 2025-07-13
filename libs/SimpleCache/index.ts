type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T;

export class SimpleCache<Fetcher extends (...args: any[]) => Promise<any>> {
  private _fetcher: Fetcher;
  data: Map<string, { createdAt: Date; updatedAt: Date; value: ReturnType<Fetcher> }>;
  REVALIDATE_TIME = 0.3;
  STALE_TIME = 1;
  revalidateOnFetch = true;
  fetching = new Map<string, boolean>();

  constructor({
    data,
    fetcher,
    revalidateTime,
    staleTime,
    revalidateOnFetch,
  }: {
    data?: [string, ReturnType<Fetcher>][];
    revalidateTime?: number;
    staleTime?: number;
    fetcher: Fetcher;
    revalidateOnFetch?: boolean;
  }) {
    this.data = new Map();
    this._fetcher = fetcher;
    if (data) data.forEach(([key, value]) => this.set(key, value));
    if (revalidateTime) this.REVALIDATE_TIME = revalidateTime;
    if (staleTime) this.STALE_TIME = staleTime;
    if (revalidateOnFetch !== undefined) this.revalidateOnFetch = revalidateOnFetch;
  }

  fetcher = async (...args: Parameters<Fetcher>) => {
    const key = this.createKey(...args);
    this.fetching.set(key, true);
    const response = await this._fetcher(...args).finally(() => this.fetching.delete(key));
    return response as ReturnType<typeof this._fetcher>;
  };

  get(request: string) {
    const item = this.data.get(request);
    if (!item) return null;
    const now = new Date();
    const diff = now.getTime() - item.updatedAt.getTime();
    const diffInMinutes = diff / 1000 / 60;
    const has = diffInMinutes < this.STALE_TIME;
    if (has) return item;
    this.data.delete(request);
    return null;
  }

  set<T extends ReturnType<Fetcher>>(request: string, value: T) {
    const item = this.get(request);
    const now = new Date();
    const createdAt = item ? item.createdAt : now;
    this.data.set(request, { createdAt, updatedAt: now, value });
  }

  delete(request: string) {
    this.data.delete(request);
  }

  clear() {
    this.data.clear();
  }

  createKey(...args: Parameters<Fetcher>) {
    return JSON.stringify(args);
  }

  waitRequest(request: string) {
    return new Promise((resolver) => {
      const interval = setInterval(() => {
        if (!this.fetching.get(request)) {
          clearInterval(interval);
          resolver(true);
        }
      }, 100);
    });
  }

  fetch = async (...args: Parameters<Fetcher>): Promise<Unwrap<ReturnType<Fetcher>>> => {
    const request = this.createKey(...args);
    const item = this.get(request);
    const isFetching = this.fetching.get(request);
    if (item) {
      const now = new Date();
      const diff = now.getTime() - item.updatedAt.getTime();
      const diffInMinutes = diff / 1000 / 60;
      const expiredStale = diffInMinutes >= this.STALE_TIME;
      const shouldRevalidate = (this.revalidateOnFetch && expiredStale) || !item.value;
      if (shouldRevalidate) this.fetcher(...args).then((value) => this.set(request, value));
      return item.value as Unwrap<ReturnType<Fetcher>>;
    }
    if (isFetching) {
      await this.waitRequest(request);
      const item = this.get(request);
      if (item) return item.value as Unwrap<ReturnType<Fetcher>>;
      return await this.fetch(...args);
    }
    const value = await this.fetcher(...args);
    this.set(request, value);
    return value as Unwrap<ReturnType<Fetcher>>;
  };
}
