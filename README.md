# Musicen 🎵

<img width="1600" alt="credit" src="https://user-images.githubusercontent.com/67114280/197378172-746ae3e6-0251-435b-b22d-5267ef412b5a.png">

### Mucisen is Decentralize Music App Built with Next Js, Hardhat, Solidity, Arweave + Bundlr Client and all of the style magic with Tailwind CSS.🎵

### Functionalities

- [x] Upload Song
- [x] Search Songs
- [x] Song Details
- [x] Play Song

### Stack

- Frontend : [Next Js](https://nextjs.org/)
- Smart Contract Lang : [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
- Indexing :  [The Graph](https://thegraph.com/en/)
- Dev Environment for ETH Software: [Hardhat](https://hardhat.org/)
- Testing: [Chai](https://www.chaijs.com/)
- File Storage : [Arweave](https://www.arweave.org/)
- Scaling Permenant Storage - [Bundlr.network](https://bundlr.network/)
- Network : [Polygon](https://polygon.technology/)
- Style : [Tailwind CSS](https://tailwindcss.com/)
- State management : [GraphQL Apollo Client](https://www.apollographql.com/)
- Toast: [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- Fonts - [Google Fonts](https://fonts.google.com/)
- Icons : [Iconsax React](https://iconsax-react.pages.dev/)



### Installation

####  Fork The Repo 

Click on the Right Side of the Top Bar to After the Watch button. <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/GitHub_Fork_Button.png" width="120px" />

Now It will be available in GitHub Account.

#### OR

#### Clone

- Clone this repo with url

```shell
git clone https://github.com/Aakrut/musicen
```

##### Setup

> Install npm dependencies using npm install

```shell
cd musicen && npm install
```

> Set up environment Variables I already Provided .env.example file.

> Create a .env file in the root directory.

> Set up required environment variables.

```
URL="POLYGON_TESTNET_URI"
PRIVATE_KEY="METAMASK_PRIVATE_KEY"
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
NEXT_PUBLIC_GRAPHQL_URI="GRAPHQL_URL"
```

> In the Root Directory First Compile Your Smart Contract with This Following Command.

```shell
npx hardhat compile
```

> After Deploy Smart Contract to the Polygon Mumbai Testnet with this command.

```shell
npx hardhat run scripts/deploy.js --network mumbai
```

> Copy Smart Contract Address and replace it in with your "CONTRACT_ADDRESS"

```
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
```

## For Setting up Graph Protocol - [The Graph](https://thegraph.com/en/)

now replace the graph url with 
```
NEXT_PUBLIC_GRAPHQL_URI="GRAPHQL_URL"
```

Let's Run this command for dev

```shell
npm run dev
--or--
yarn dev
```

### Screenshots

<img width="1600" alt="musicen" src="https://user-images.githubusercontent.com/67114280/197378182-c3882d3b-8e60-43ac-a76a-97678696a165.png">

<img width="1600" alt="dashboard" src="https://user-images.githubusercontent.com/67114280/197378178-fdc9cb94-248c-466f-aa52-4be05252cad6.png">

<img width="1600" alt="search" src="https://user-images.githubusercontent.com/67114280/197378158-22ceb19d-a7b1-40ca-8bea-0b8b37b58bc7.png">

<img width="1600" alt="upload" src="https://user-images.githubusercontent.com/67114280/197378165-0d1b3451-3afb-4504-b275-7df90ceeb7d6.png">

<img width="1600" alt="song" src="https://user-images.githubusercontent.com/67114280/197378162-c23d4924-5f64-40ed-bdc3-c64ce59a4fb2.png">

<img width="1600" alt="responsive" src="https://user-images.githubusercontent.com/67114280/197378143-1b1371a5-4f46-4d3a-b3a8-891379e86047.png">
