# Bytebank Mobile | FIAP Tech Challenge

## Contexto do projeto

Este projeto é uma aplicação de gerenciamento financeiro desenvolvida como parte de um desafio técnico da FIAP Tech, utilizando React Native e Expo. O objetivo do projeto é fornecer uma solução prática para o gerenciamento de finanças pessoais, permitindo que os usuários registrem, acompanhem e analisem suas receitas e despesas diretamente do smartphone.

&nbsp;

## Tecnologias utilizadas

React Native: Framework para desenvolvimento de aplicações móveis nativas.

React Native SVG: Suporte a vetores SVG em aplicações React Native.

React Native Gifted Charts: Biblioteca para criação de gráficos no app.

React Navigation: Biblioteca para navegação entre telas, utilizando tabs no projeto.

Expo: Plataforma que facilita o desenvolvimento com React Native, fornecendo ferramentas e bibliotecas integradas.

Expo Router: Sistema de rotas baseado em arquivos, inspirado no Next.js.

TypeScript: Superconjunto tipado do JavaScript, trazendo mais segurança ao código durante o desenvolvimento.

Firebase: Plataforma Backend-as-a-Service (BaaS) usada para autenticação, banco de dados e armazenamento de arquivos.

Re-State: Biblioteca para gerenciamento de estado global baseada em hooks do React.

Async Storage: Armazenamento assíncrono local para persistência de dados simples.

Day.js: Biblioteca leve para manipulação de datas, facilitando operações relacionadas a datas e horários.

Prettier: Formatador de código para manter a consistência e padronização.

&nbsp;

## Como Executar o Projeto

### Variáveis de ambiente

```bash
EXPO_PUBLIC_API_KEY='<API_KEY>'
EXPO_PUBLIC_AUTH_DOMAIN='<AUTH_DOMAIN>'
EXPO_PUBLIC_PROJECT_ID='<PROJECT_ID>'
EXPO_PUBLIC_STORAGE_BUCKET='<STORAGE_BUCKET>'
EXPO_PUBLIC_MESSAGING_SENDER_ID='<MESSAGING_SENDER_ID>'
EXPO_PUBLIC_APP_ID='<APP_ID>'
EXPO_PUBLIC_MEASUREMENT_ID='<MEASUREMENT_ID>'
```

### Configurações firebase

1. Firestore

```bash
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only authenticated content owners access
    match /transactions/{userId}/items/{document} {
      allow read, write: if request.auth != null && request.auth.uid == userId
    }
  }
}
```

2. Storage

```bash
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

&nbsp;

### Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

```shell
git clone https://github.com/FehSouza/tech-challenge-finance-mobile
```

2. Acesse o diretório do projeto:

```bash
cd tech-challenge-finance-mobile
```

3. Instale as dependências:

```bash
pnpm install
```

4. Execute a aplicação:

   4.1. iOS:

   ```bash
   pnpm run ios
   ```

   4.2. Android

   ```bash
   pnpm run android
   ```

   4.3. Web

   ```bash
   pnpm run web
   ```

5. Abra o aplicativo com o Expo Go no seu celular ou use um emulador.
