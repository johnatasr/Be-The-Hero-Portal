<h4 align="center">
    Be the Hero Portal <img alt="GitHub last commit" src="https://travis-ci.com/johnatasr/Be-The-Hero-Portal.svg?branch=master" width="80">
</h4>
<p align="center">
  

</p>

Projeto desenvolvido inicialmente com o curso da Rocketseat, não terminado por mim, então tempos depois decidi incrementar algumas coisas, resolvi mudar o Backend de NodeJS para Django, onde foi elaborada uma melhoria na API , criada a autenticação de usuários via JWT, foi implementado um módulo para ser usado o Elastisearch como ferramenta de busca, porém seria usar um canhão para matar uma formiga, deixei lá caso seja necessário basta habilitar junto a instância do Elastic, logo, temos um mecanismo de busca, o usuário administrador também pode ter mais de uma ONG com seus respectivos incidentes e algumas incrementações na interatividade das páginas.

A parte do backend é basicamente o uso de Django Rest Framework para a parte de APIs, SimpleJWT para autenticação, Django Elasticsearch para consulta (necessária instância do Elastic), Teste unitários de modelos e api. O fluxo de deploy é feito na junção das três tecnologias Github, Travis CI e Heroku, onde ocorre um processo de CI/CD no deploy da aplicação respeitando o critério dos testes.


###### WARNING! Este projeto está apenas em ambiente de desenvolvimento.

## Tecnologias

* React Native | Class Based | Hooks
* Django 3 | Django Elasticsearch | Django RestFramework
* React Js | Routes | Babel | Webpack
* Heroku
* Travis CI 
* ReactNavigation 5 
* Expo
* Axios
* React AwesomeAlerts | Feather Icons | Modalize | React Bootstrap

## Executar

Passos para executar o projeto:

1. `git clone` do projeto
2. pip install -r requiremts.txt
3. python manage.py runserver


## Link do repositório Mobile 

https://github.com/johnatasr/Be-The-Hero-Mobile

