import Navbar from "./UI/Navbar.tsx";

export default function About() {
  return (
    <div id="root-about" className="h-max w-full bg-black overflow-y-auto">
    <Navbar></Navbar>
      <main className="text-black bg-white rounded-3xl p-4 w-[80%] mx-auto my-8 h-max">
        <p>
          <strong>Bem-vindo à nossa plataforma de colaboração e inovação!</strong>
          {" "}Este projeto nasceu com o objetivo de conectar ideias, talentos e soluções
          de forma colaborativa e contínua. A plataforma é um espaço onde os
          usuários podem <strong>compartilhar ideias de projetos</strong>, incluindo
          tarefas específicas que ainda precisam ser desenvolvidas. Isso
          permite que outros usuários interessados contribuam, aprimorem ou criem
          soluções baseadas nos projetos existentes. A dinâmica é simples:
        </p>
        <ul className="m-2 list-disc px-12">
          <li><strong>Publicação de ideias:</strong> Os usuários cadastram seus projetos e destacam as tarefas
            pendentes.
          </li>
          <li><strong>Colaboração ativa:</strong> Outros usuários, ao visualizar os projetos, podem trabalhar em
            melhorias ou em soluções para as tarefas ainda não concluídas.
          </li>
          <li><strong>Propostas de contribuição:</strong> Após finalizar uma solução, o colaborador pode enviá-la para o
            responsável pelo projeto, que decidirá se a implementa ou não.
          </li>
        </ul>
        <p>
          Nosso objetivo é criar um ambiente onde ideias não fiquem paradas. Em vez disso, elas evoluem com a ajuda de
          pessoas que compartilham da mesma paixão pelo desenvolvimento.
        </p>

        <h3 className="my-4">Por que criamos esta plataforma?</h3>
        <p>
          A motivação principal é <strong>incentivar a colaboração e a troca de conhecimento</strong> entre estudantes e
          profissionais da área de Tecnologia. Muitos projetos acabam ficando estagnados por falta de tempo,
          conhecimento ou recursos. Com nossa plataforma:
        </p>
        <ul className="list-disc px-12">
          <li>Usuários podem <strong>compartilhar partes de um projeto inacabado</strong>, como um back-end, e permitir
            que outras pessoas desenvolvam o restante, como o front-end ou funcionalidades adicionais.
          </li>
          <li>Estudantes podem usar partes de projetos para <strong>estudo e prática</strong>, integrando novas soluções
            ou testando habilidades específicas, como o desenvolvimento de aplicações client-side ou APIs.
          </li>
          <li>
            <strong>Empresas ou instituições</strong> podem lançar desafios e propostas de projetos para que a
            comunidade os desenvolva gradualmente, promovendo soluções reais e evitando o abandono de ideias
            promissoras.
          </li>
        </ul>
        <p>Esse modelo promove a criação de um ciclo colaborativo e evita que ideias e projetos fiquem apenas no
          papel.</p>

        <h3 className="my-4">Quem pode usar?</h3>
        <p>
          Nosso público-alvo inicial são os <strong>estudantes da área de Tecnologia da Universidade de Pernambuco
          (UPE), especialmente do campus Garanhuns</strong>. Contudo, o projeto está aberto para crescer e integrar:
        </p>
        <ul className="list-disc px-12">
          <li>Estudantes de outras universidades, como a <strong>UFAPE</strong>, criando um ecossistema de colaboração
            mais amplo.
          </li>
          <li><strong>Empresas interessadas</strong> em apresentar problemas reais que possam ser resolvidos de forma
            colaborativa.
          </li>
          <li>Qualquer pessoa interessada em aprender, desenvolver ou contribuir para soluções tecnológicas.</li>
        </ul>

        <h3 className="my-4">O que queremos alcançar?</h3>
        <p>Nosso propósito é ambicioso e focado na colaboração:</p>
        <ul className="list-disc px-12">
          <li><strong>Facilitar a gestão de projetos pessoais,</strong> permitindo que estudantes os compartilhem e os
            desenvolvam continuamente.
          </li>
          <li><strong>Promover a troca de conhecimento técnico e criativo</strong> entre estudantes desenvolvedores.
          </li>
          <li><strong>Aproximar estudantes do mercado de trabalho,</strong> conectando-os a problemas reais enfrentados
            por empresas.
          </li>
          <li><strong>Evitar a estagnação de projetos pessoais,</strong> incentivando a continuidade e a evolução das
            ideias.
          </li>
          <li><strong>Fomentar habilidades técnicas,</strong> como programação, design e integração de sistemas, de
            forma prática e colaborativa.
          </li>
        </ul>
        <p>
          Se você acredita que ideias boas merecem ser desenvolvidas e que a colaboração é a chave para o progresso,
          esta plataforma é para você!
        </p>
        <p><strong>Junte-se a nós e comece a transformar ideias em realidade!</strong></p>
      </main>
    </div>
  );
}
