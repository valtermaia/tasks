# TASKS

Este é o primeiro dasafio do curso de Fundamento do Node.js da Rocketseat.

API para realizar o CRUD de tasks (tarefas).

## Requisitos

* [X] Criação de uma task
* [X] Listagem de todas as tasks
* [X] Atualização de uma task pelo id
* [X] Remover uma task pelo id
* [X] Marcar pelo id uma task como completa
* [X] Importação de tasks em massa por um arquivo CSV

## Regras de negócio e rotas

* Estrutura de uma Task

  * id - identificador único
  * title - título da task
  * description - descrição detalhada de uma task
  * completed_at - data de quando a task foi concluída. O valor inicial deve ser null
  * created_at - data de quando a task foi criada
  * updated_at - deve ser sempre alterado para a data de quando a task foi atualizada
* Rotas

  * POST - /tasks
  * GET - /tasks
  * PUT - /tasks/:id
  * DELETE - /tasks/:id
  * PATCH - /tasks/:id/complete
* A importação do CSV será feita utilizando a lib **csv-parse** para iterar nas linhas do arquivo chamando a rota POST /tasks para cada linha lida
* Formato do CSV:
   * title,description
   * Task 01,Descrição da Task 01
   * Task 02,Descrição da Task 02
   * Task 03,Descrição da Task 03
   * Task 04,Descrição da Task 04
   * Task 05,Descrição da Task 05
