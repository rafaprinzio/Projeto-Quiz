import type { Question } from '@/types/quiz'

export const questions: Question[] = [
  {
    id: 1,
    difficulty: 'easy',
    answer: true,
    statement:
      'Claude Code é uma ferramenta de linha de comando (CLI) criada pela Anthropic que permite usar IA diretamente no terminal.',
    explanation:
      'Claude Code é exatamente isso — uma CLI agentic da Anthropic que roda no terminal e permite ao Claude agir diretamente no seu ambiente de desenvolvimento, lendo arquivos, executando comandos e muito mais.',
  },
  {
    id: 2,
    difficulty: 'easy',
    answer: false,
    statement: 'Claude Code só funciona em computadores Mac.',
    explanation:
      'Claude Code é compatível com macOS, Linux e Windows (via WSL). Ele roda em qualquer sistema onde o Node.js esteja instalado.',
  },
  {
    id: 3,
    difficulty: 'easy',
    answer: true,
    statement:
      'Claude Code pode ler e escrever arquivos diretamente no computador do usuário.',
    explanation:
      'Uma das principais capacidades do Claude Code é interagir com o sistema de arquivos — ele pode ler, criar, editar e deletar arquivos, sempre com a supervisão e aprovação do usuário.',
  },
  {
    id: 4,
    difficulty: 'medium',
    answer: false,
    statement:
      'Claude Code é completamente gratuito e sem limites de uso para qualquer pessoa.',
    explanation:
      'Claude Code requer uma assinatura Claude Pro/Max ou uma API Key da Anthropic (paga por uso). O acesso não é ilimitado nem gratuito — há planos e custos associados ao uso da API.',
  },
  {
    id: 5,
    difficulty: 'medium',
    answer: true,
    statement:
      'Claude Code consegue executar testes automatizados e corrigir bugs no código sem precisar de intervenção humana em cada passo.',
    explanation:
      'Claude Code é agentic: ele pode rodar testes, identificar falhas, corrigir o código e rodar os testes novamente em ciclos automáticos — um loop de desenvolvimento autônomo supervisionado pelo dev.',
  },
  {
    id: 6,
    difficulty: 'medium',
    answer: true,
    statement:
      'Claude Code pode trabalhar com múltiplos arquivos ao mesmo tempo para completar uma tarefa complexa.',
    explanation:
      'Diferente de um chatbot comum, o Claude Code entende o contexto de projetos inteiros. Ele navega por múltiplos arquivos, entende a estrutura do código e faz mudanças coordenadas em vários arquivos quando necessário.',
  },
  {
    id: 7,
    difficulty: 'medium',
    answer: true,
    statement:
      'Claude Code pode ser integrado diretamente em IDEs como VS Code e IntelliJ sem precisar do terminal.',
    explanation:
      'Claude Code possui extensões oficiais para VS Code e IDEs da JetBrains (IntelliJ, PyCharm, etc.), permitindo usar todas as capacidades diretamente dentro do editor de código preferido do desenvolvedor.',
  },
  {
    id: 8,
    difficulty: 'hard',
    answer: false,
    statement:
      'Ao usar Claude Code, todo o código-fonte da empresa é automaticamente enviado para a Anthropic para treinamento de modelos.',
    explanation:
      'A Anthropic possui política de não usar dados de API para treinamento por padrão. Empresas que usam a API (incluindo via Claude Code) têm controle sobre seus dados. É importante verificar os termos de uso do plano contratado.',
  },
  {
    id: 9,
    difficulty: 'hard',
    answer: true,
    statement:
      'Claude Code suporta um sistema de "hooks" que permite executar scripts automáticos antes ou depois de certas ações, como salvar um arquivo ou rodar um comando.',
    explanation:
      'O sistema de hooks do Claude Code permite que times configurem automações que rodam em resposta a eventos específicos (ex: antes de um commit, após editar um arquivo). Isso possibilita integrar validações, formatadores e pipelines personalizados.',
  },
  {
    id: 10,
    difficulty: 'hard',
    answer: true,
    statement:
      'É possível criar fluxos com múltiplos agentes Claude Code trabalhando em paralelo no mesmo projeto.',
    explanation:
      'Claude Code suporta arquiteturas multi-agente via o Agent SDK da Anthropic. Um agente "orquestrador" pode delegar tarefas para sub-agentes especializados que rodam em paralelo, acelerando tarefas complexas como revisão de código em larga escala.',
  },
]
