<p align="center">
  <img src="./images/logotype.png" alt="logotype" width="250" />
</p>

<p align="center">
  <b>Easy Carros Marketplace</b>
  <br>
  <span>Plataforma de marketplace para serviços automotivos</span>
  <br>
  <sub>Feito com ❤️ por <a href="https://github.com/calmonr">Calmon Ribeiro</a></sub>
</p>

## Índice

- [Introdução](#introdução)
- [Sobre](#sobre)
  - [Histórias](#histórias)
- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Executando](#executando)
- [Endpoints](#endpoints)
- [Resolução](#resolução)
  - [Introdução](#introdução-1)
  - [História 1](#história-1)
  - [História 2](#história-2)
  - [História 3](#história-2)
- [Futuro](#futuro)

## Introdução

Projeto desenvolvido como parte do processo seletivo da [Easy Carros](https://easycarros.com/) para back-end developers.

Essa documentação expõem todo o processo de estudo, criação e execução da aplicação.

## Sobre

A missão é criar uma versão simplificada do Easy Carros Marketplace que funcione como uma API.

### Histórias

1. Usuário se autentica na aplicação

> Eu, como cliente da Easy Carros, gostaria de me autenticar no sistema, fornecendo:
>
> 1. E-mail
> 2. Senha
>
> Caso o e-mail e a senha estejam corretos:
>
> - Quero receber uma chave de autenticação
>
> Caso contrário:
>
> - Quero receber uma mensagem de erro me informando o problema

2. Usuário solicita serviço

> Eu, como cliente da Easy Carros, gostaria de uma vez que estiver autenticado no sistema poder solicitar um dos serviços disponíveis, fornecendo:
>
> 1. A chave de autenticação
> 2. O tipo de serviço que eu preciso: `'OIL_CHANGE'` ou `'DRY_WASHING'`
> 3. As coordenadas (latitude e longitude) do endereço onde quero que o serviço seja realizado
>
> Caso a chave seja inválida:
>
> - Quero receber um erro me informando o problema
>
> Caso haja algum profissional disponível para aquele serviço **dentro de um raio de 10 km**:
>
> - Quero receber as informações de um (1) profissional escolhido (qualquer um que respeite os critérios)
>
> Caso contrário:
>
> - Quero receber uma mensagem de erro me informando que não há um profissional disponível

3. Usuário busca profissionais disponíveis (bônus)

> Eu, como cliente da Easy Carros, gostaria de uma vez que estiver autenticado no sistema, poder visualizar uma lista de profissionais que atendem um determinado endereço, fornecendo:
>
> 1. A chave de autenticação
> 2. O endereço (Ex: Av. Paulista, 1578), onde quero que o serviço seja realizado
>
> Caso a chave seja inválida:
>
> - Quero receber um erro me informando o problema
>
> Caso haja profissionais disponíveis para aquele serviço **dentro de um raio de 10 km**:
>
> - Quero receber uma lista com todos os profissionais que atendem dentro desse raio, contendo pelo menos:
>
> 1. Nome
> 2. Serviços disponíveis
>
> Caso contrário:
>
> - Quero receber uma lista vazia

## Tecnologias

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Argon2](https://github.com/ranisalt/node-argon2/)
- [GeoJSON](https://geojson.org/)
- [JSON Web Token](https://jwt.io/)
- [OpenCage Geocoder](https://opencagedata.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [PostGIS](https://postgis.net/)
- [Docker](https://www.docker.com/)

## Requisitos

Existem dois requisitos principais e essenciais na aplicação.

1. pnpm

O pnpm é um gerenciador de pacotes assim como o `npm` e o `yarn` mas com algumas diferenças e diversas vantagens.

A Microsoft usa o pnpm em repositórios com centenas de projetos e centenas de PRs por dia e por isso é muito rápido e confiável.

Para instalar é bem simples, execute o seguinte comando em seu terminal:

> npm install -g pnpm

Você pode conhecer melhor entrando no site oficial: [https://pnpm.js.org/](https://pnpm.js.org/)

2. Docker

Para evitar a instalação dolorosa de todas as tecnologias incluindo o banco de dados PostgreSQL e a extensão PostGIS, mantendo também a consistência entre os ambientes, nós utilizamos o Docker.

O processo de instalação é bem simples, entre na documentação oficial [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/) e siga os passos para o seu sistema operacional.

## Executando

É hora de ver a aplicação em ação 🙌. Siga todos os passos para garantir que não haverá nenhum problema na execução.

Primeiro nós vamos precisar do código, não é mesmo? Para isso vamos clonar o repositório:

> git clone https://github.com/calmonr/easycarros.git

E no mesmo terminal, navegue para a pasta do repositório clonado (`cd easycarros`) e vamos começar.

> Nos próximos passos nós estaremos modificando alguns arquivos e você pode estar utilizando qualquer editor de texto (código) ou IDE da sua preferência. Eu estou utilizando o [VS Code](https://code.visualstudio.com/).

---

O dotenv é uma ferramenta que ajuda no carregamento de variáveis de ambiente, ou seja, toda nossa configuração ficará contida em um arquivo chamado `.env`.

Em seu editor de texto (código) ou IDE, crie uma cópia do arquivo `.env.defaults` com o nome `.env` e adicione as informações requeridas pela aplicação.

1. `APPLICATION_KEY`

É a chave utilizada na geração do JWT (JSON Web Tokens) de autenticação dos usuários. Eu costumo utilizar um [gerador de UUID](https://www.uuidgenerator.net/).

Um exemplo:

```
# application
APPLICATION_KEY=4b40f7be-b348-40ef-9f94-329be574774f
```

2. PostgreSQL

Essa parte é autoexplicativa, lembrando que o Docker também seguirá esse modelo de configuração para instalação do PostgreSQL. Não é necessário criar o banco de dados manualmente.

Um exemplo:

```
# database
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_USERNAME=easycarros
DATABASE_PASSWORD=easycarros
DATABASE_NAME=marketplace
```

3. OpenCage Geocoder

Existem diversas soluções de geocoder como Google Geocoding, Yandex Geocoder. Nós utilizamos o [OpenCage Geocoder](https://opencagedata.com/) por toda sua facilidade e vantagens.

É necessário que você crie uma conta [clicando aqui](https://opencagedata.com/users/sign_up/). O plano grátis é mais do que o suficiente para nós. (2,500 requisições/dia¹, não é necessário cartão de crédito²).

Em seu painel você verá a sua chave e então configure assim:

```
# opencage geocoder
OPENCAGE_API=72d9eff3710848b19623d956f6ecee38
```

⚠️ Não utilize a mesma chave pois não será funcional.

Pronto, ufa... Estamos prontos para ligar a belezinha.

---

Nós vamos rodar alguns comandos no terminal para executar a aplicação.

1. Primeiro vamos pedir para o Docker fazer a sua mágica

> docker-compose up -d

E com isso teremos o nosso banco de dados rodando.

2. Nós precisamos das dependências da aplicação instaladas

> pnpm install

3. E também de nossas tabelas no banco de dados

> pnpm migration:run

4. Como nós queremos testar a aplicação, vamos adicionar alguns parceiros semeando o banco de dados

> pnpm seed:run

5. E por fim...

> pnpm start:dev

Se você ver a mensagem:

> √ The server is running at http://127.0.0.1:8080

Parabéns, a aplicação está rodando. 🚀

## Endpoints

Todos os endpoints documentados podem ser encontrados aqui: https://documenter.getpostman.com/view/12442158/T1LTfQRU

## Resolução

### Introdução

É aqui onde entramos no nosso modo nerd (🤓) e investigamos as melhores soluções para cada história.

Não entraremos muito no aspecto técnico e sim teórico, como tomada de decisões para as tecnologias.

Lembrando que você pode ler essa seção imaginando que sou eu externando meus pensamentos em como resolver cada história.

### História 1

Nosso foco nessa história é a autenticação do usuário e retornar para o mesmo alguma chave de identificação dessa autenticação.

É muito comum a utilização do padrão JWT (JSON Web Tokens) para a geração de chaves de autenticação, com ele nós podemos armazenar objetos JSON de forma compacta e segura.

Existem diversas outras formas que auxiliam autenticação de um usuário como sessões mas para manter a simplicidade e seguir os requerimentos da história nós **utilizamos o JWT**.

O JWT não tem uma vantagem sobre o uso de "sessões" por dizer. Os JWTs fornecem um meio de manter o estado da sessão no cliente em vez de fazê-lo no servidor. (para ter em mente).

### História 2

É aqui onde a brincadeira começa. Nós temos os **parceiros** que oferecem serviços e eles também disponibilizam as suas informações geográficas como **coordenadas**.

Nossa primeira missão é resolver os serviços de um parceiro. Nós temos diversas opções, poderíamos utilizar as vantagens de um banco de dados relacional e criar outras tabelas para guardar apenas informações de serviços e fazer o relacionamento entre essa tabela e um parceiro.

É possível resolver esse problema sem a necessidade de criar outras tabelas. O PostgreSQL permite que as colunas de uma tabela sejam definidas como [arrays multidimensionais](https://www.postgresql.org/docs/current/arrays.html), ou seja, nós podemos criar uma coluna que armazena um array no tipo primitivo de texto, facilitando a inserção, edição e remoção de serviços.

Não existe o problema da repetição do serviço no banco de dados entre vários parceiros pois estamos trabalhando com um dado simples (apenas o identificador do serviço - ex: `OIL_CHANGE`).

Nossa segunda missão é tratar as coordenadas (latitude e longitude) do endereço onde o cliente quer o serviço e esse parceiro deve estar dentro de um raio de **10km**.

Nós precisamos guardar essas informações no banco de dados antes de qualquer coisa e para isso criaremos duas colunas, uma para latitude e outra para longitude no formato decimal.

O próximo problema é saber se as coordenadas de um ou vários parceiros estão dentro de um raio de 10km.

Para resolver esse problema nós podemos utilizar a fórmula de Haversine:

![Haversine](./images/haversine.png)

> A fórmula de Haversine é uma importante equação usada em navegação, fornecendo distâncias entre dois pontos de uma esfera a partir de suas latitudes e longitudes.
> — Wikipédia

Perfeito, é exatamente o que queremos.

Então, agora podemos saber se a distância do cliente é equivalente a um raio de 10km de um parceiro.

⚠️ Mas... nós temos um problema aqui meu pequeno [Padawan](https://starwars.fandom.com/pt/wiki/Padawan).

Vamos pensar em termos de execução da aplicação. Quando um cliente faz a solicitação de um serviço especificando também as coordenadas nós vamos precisar buscar no banco de dados todos (literalmente) os parceiros que executam aquele serviço e logo em seguida utilizar a fórmula de Haversine para calcular a distância entre eles e criar uma condição para sabermos se ele está no raio de 10km como requerido. (isso para cada parceiro).

Conseguiu ver o problema? Pois bem, para uma aplicação simples e que não tem o propósito de ficar online (como esse) não teríamos problema, mas quando pensamos em uma aplicação maior, isso seria um grande problema.

O Uber e outros aplicativos não devem funcionar assim, correto? Imagina essa nossa aplicação com 10, 50, 100 mil parceiros e diversos (para não dizer milhões) de usuários. 😨

Por mais que nossa aplicação seja simples nós queremos ir além, não é mesmo?

É aqui onde entra os bancos de dados espaciais. 🌎

> Banco de dados espaciais é um banco de dados utilizado para armazenamento de informações sobre o espaço geográfico.
> — Wikipédia

Com os bancos de dados espaciais nós podemos guardar informações de objetos geométricos simples, como pontos, linhas e polígonos. E o nosso interesse aqui é exatamente os pontos.

O [PostGIS](https://postgis.net/) é uma extensão que adiciona suporte para objetos geométricos no PostgreSQL e por isso vamos utilizar para dar continuidade no nosso banco de dados sem a necessidade de mudar para outro.

Teremos que fazer uma modificação na forma que guardamos as informações de coordenadas. Normalmente em outra situação iríamos guardar a latitude e longitude em suas respectivas colunas, no entanto nós queremos um tipo específico que é um ponto geométrico com **SRID 4326** (identificador de referência espacial).

SRID 4326? 🤔

Os mapas fazem muitas coisas interessantes, mas há uma que os torna indispensáveis: os mapas nos permitem comunicar sobre a localização usando uma estrutura comum. Sem essa estrutura comum, os mapas não seriam tão úteis - por exemplo, a distância relativa seria quase impossível de medir e compartilhar.

Mas os mapas não fornecem apenas um sistema único para comunicação sobre locais e medição de distância - existem maneiras literalmente infinitas de falar sobre distâncias e locais na superfície da terra. Eles são chamados de sistemas de coordenadas e determinam não apenas a aparência dos mapas, mas também como os dados são armazenados e como a distância é calculada.

Legal né?

No mapeamento da web, existem dois sistemas de coordenadas principais para nosso trabalho: EPSG:4326 (WGS 84) e o EPSG:3857.

E porque o EPSG:4326 (WGS 84)?

O Sistema Geodésico Mundial de 1984 (WGS) é o sistema de coordenadas geográficas usado pelo GPS para expressar localizações na terra, ou seja, vai funcionar como uma luva para nós.

O PostGIS requer que nós especifiquemos o SRID várias vezes em alguns métodos e por isso nós vamos utilizar o [GeoJSON](https://geojson.org/), formato que também é suportado pelo PostGIS e trabalha com o SRID 4326 por padrão. E por ser em JSON nós gostamos também 👍

E com isso nós resolvemos o problema que tínhamos antes de performance da aplicação e deixando ele escalável, sem contar nas outras diversas possibilidades.

Outro ponto super importante que resolvemos por conta do banco de dados espaciais com maior facilidade é **não apenas listar o parceiro com o serviço por ordem de inserção no banco de dados (como estava antes), mas também por distância,** ou seja, o parceiro mais próximo do cliente que oferece o serviço especificado será retornado. (e todos ficam felizes).

Obs: em muitos momentos no código utilizamos longitude e latitude e não latitude e longitude, o motivo disso é a padronização de várias aplicações GIS (ex: GeoJSON).

### História 3

Nossa missão nessa história é retornar todos os parceiros que estão em um raio de **10km**, listando também os seus serviços disponíveis utilizando um endereço em forma de texto.

O nosso primeiro desafio fica super facilitado por conta da história 2, nós temos a abstração para buscar parceiros próximos de um cliente usando as suas coordenadas.

O nosso segundo desafio é que temos o endereço do cliente em forma de texto, para isso nós vamos precisar de algum serviço chamado de `forward geocoding`, que tem a função de encontrar a latitude e longitude de um endereço.

Como explicado no processo de [execução da aplicação](#executando), nós utilizamos o [OpenCage Geocoder](https://opencagedata.com/).

Com as coordenadas em mãos nós podemos reutilizar a solução da história 2 e retornar todos os parceiros (ordenados por distância).

## Futuro

Em breve (em um tempo livre), irei criar um branch com a versão da aplicação em [GraphQL](https://graphql.org/) utilizando algumas ótimas tecnologias como o [TypeGraphQL](https://typegraphql.com/).
