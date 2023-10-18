# 🏷️ Sujeito Pizza Backend

<img src="./src/assets/banner.png" alt="Página de login do projeto<img  />" width="100%" />

## 📖 Descrição

Esse é um projeto que estou desenvolvendo junto com o curso Fábrica de Aplicativos, onde estamos
criando um sistema para uma pizzaria ou lanchonetes, desde o backend, até op front web e mobile.

A ideia e fazer com que a empresa tenha um melhor controle e informações de funcionários, produtos e pedidos!

Além das rotas e validações que criamos com o curso, adicionei validações de cargos e permições, rotas para alterações de produtos, categorias e usuários, propriedades amais para melhorar o controle dos pedidos e usuários.

## ⚙️ Funcionalidades

Esse backend contém rotas para cadastrar, logar, alterar dados ou senha, e listar usuários;

Obs Todas as rotas exeto a rota de login é necessário o token JWT para acesso e permições!.

## 🆕 Rotas POST

"/users"

```
Essa rota e responsável por gerar um cadastro de usuário, que somente os adm tem permissão para gerar,
e necessário enviar um JSON contendo "name", "email" e "password", que são Strings.
```

"/session"

```
Rota que loga usuário ele espera que seja enviado como JSON um "email" e "password", que são strings.
```

"/category"

```
Rota que cadastra uma categoria, que somente o adm tem permissão e é necessário enviar um JSON contendo "name" que é uma string.
```

"/product"

```
Essa rota cadastra um produto, é necessario enviar um Multipart Form contendo "name", "price", "description", "file" e "category_id", todos são strings exeto a file que é uma imagen.
```

"/order"

```
Essa rota é resonsável para gerar um pedido, o garço também tem permissão, e é necessário enviar um JSON contendo "table" e "name", table é um number e name uma string.
```

"/order/add"

```
Essa rota adiciona items ao pedido, adms e garçom tem permissão, é necessário o envio de um JSON contendo "order_id", "product_id" e "amount", amout e um number e o restante são strings.
obs: O item se relaciona com o pedido e com o produto!.
```

## 🔍 Rotas GET

"/users"

```
Essa rota é responsável por buscar todos os usuários, apenas o administrador tem permissão para listar os usuários!.
```

"/me"

```
Essa rota lista detalhes do usuário logado.
```

"/category"

```
Lista todas as categorias.
```

"/category/prduct"

```
Lista od produtos de uma categoria e esperado como query um category_id de uma categoria.
```

"/orders"

```
Essa rota lista os pedidos que não é mais um draft, e estão ativos.
```

"/order/detail"

```
Essa rota lista os detalhes do pedido, é necessário enviar como query o order_id que é o id do pedido.
```

## 🔄 Rotas PUT

"/user/update"

```
Essa rota atualiza os dados do usuário exeto o password, para ser gerenciado pelos adms, é necessário o envio de um JSON contendo "user_id", "name", "role", "email", "status", todos exeto o status são string, o status é para controlar se o usuário está ou não tivo na empresa, role é o cargo que ele ocupa.
```

"/user"

```
Essa rota é responsável para alterar a senha do usuário sendo necessário o envio de um JSON contendo "password", "new_password" e "user_id", todos são strings.
```

"/category"

```
Essa Rota responsável por alterar o nome de uma categoria, apenas amds tem permissão e é necessário o envio de um JSOn contendo "name" e "category_id" que são strings.
```

"/product"

```
Esa rota é responsável por alterar dados de um produto, apenas adms tem permissões, nessa rota e validado se o usuário está alterando a imagem ou apenas os dados, no insominia estou enviando um Multipart Form contendo
"name", "price", "description", "category_id", "product_id" e "file", exeto o file todos são strings e o file é uma imagen.
```

"/order/send"

```
Essa rota é reponsável para atualizar o draft de um pedido, informando que não e mais um rascunho e que o pedido foi confirmado, adms e garçon tem permição, e é necessário o envio de um JSON contendo "order_id" o id do pedido.
```

"/item/update"

```
Essa rota é responsável por alterar a quantidade de um item de um pedido, adms e garçom tem permissão, é necessário o envio de um JSON contendo "item_id" e "amount", item_id é uma string e amount é um number.
```

"/order/update"

```
Essa rota é responsável por avançar as etapas do pedido, sendo necessário o envio de um JSON contendo um "order_id" que é o id de um pedido, as etapas do pedido são pedido pendentes, em preparação, pronto para servir e servido, que são manipuladas pelo cozinheiro, garçom e adms
```

/order

```
Essa rota é responsável por desativar um pedido deixando ele com status de disabled, é necessário o envio de uma query passando order_id do pedido, assim mantendo um historico de pedidos
```

## 🗑️ Rotas Delete

```
Essa Rota é responsável por deletar um item do pedido, adms e garçon tem permissão e é necessário o envio de uma query contendo o item_id que é o id do item.
```

OBS: Deixei essa rota apenas para aprender a utilização do metodo, mas a ideia e manter um histórico e não deletar

## 🧰 Ferramentas

Nesse projeto está sendo utilizado:

⚛️ REACT, 🚂 EXPRESS, 💡 PRISMA, 🐘 POSTGRESQL, 🔷 TYPESCRIPT, 🔀 CORS, 🔐 TOKEN JWT.

##

Esse é meu primeiro projeto backend e primeira documentação, com o tempo vou melhorar essa DOC e deixar mais simples e direta!!
