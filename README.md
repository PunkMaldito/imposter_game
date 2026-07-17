# O Impostor

Jogo de palavras multiplayer para jogar com amigos em uma chamada de vídeo (Google Meet, Discord, etc.) ou pessoalmente. Todo mundo recebe a mesma palavra secreta — menos o(s) Impostor(es), que recebem uma palavra parecida, mas diferente. Dê pistas, descubra quem está mentindo e vote antes que o Impostor escape.

## Como jogar

### 1. Criar ou entrar em uma sala

- Um jogador digita o nome e toca em **Criar sala** — isso gera um código de 6 caracteres.
- Compartilhe o código com os outros jogadores, que digitam o nome e o código em **Entrar na sala**.
- Mínimo de 3 jogadores para começar.

### 2. Configurar a sala (só o host)

- **Impostores**: quantos jogadores serão impostores nessa rodada (o jogo limita automaticamente o máximo com base no número de jogadores).
- **Palavras personalizadas** (opcional): veja a seção [Palavras personalizadas](#palavras-personalizadas) abaixo. Se deixar em branco, o jogo sorteia entre dezenas de palavras já incluídas.

### 3. Revelar sua palavra

Cada jogador toca no card para virá-lo e ver sua palavra secreta (ou aviso de que é o Impostor) — sem que os outros vejam a tela. Depois de ver, toque em **Já vi minha palavra**.

### 4. Dar pistas

Em ordem de turno, cada jogador dá uma pista sobre a palavra. A pista deve ajudar os outros civis a reconhecer que você conhece a palavra certa, sem entregá-la — e sem ser tão óbvia que o Impostor descubra qual é a palavra.

**Jogando por chamada de vídeo?** Não é preciso digitar nada: fale sua pista em voz alta pra galera e toque em **Terminei ✓** para passar a vez. Se preferir, ainda dá pra digitar uma palavra — mas é só uma opção, não uma obrigação.

### 5. Votar

Depois que todos derem sua pista, cada jogador vota em quem acha que é o Impostor. Não é possível votar em si mesmo.

### 6. Resultado

- Se o Impostor for o mais votado, os **civis vencem**.
- Se outra pessoa for eliminada (ou houver empate), o **Impostor vence**.
- O host pode tocar em **Jogar novamente** para começar uma nova rodada na mesma sala.

## Palavras personalizadas

O host pode substituir as palavras padrão do jogo por uma lista própria, direto na tela da sala, antes de começar.

**Formato**: uma linha por grupo de palavras, separadas por vírgula. A **última palavra da linha** é sempre a do Impostor; todas as outras são palavras válidas para os civis (uma delas é sorteada a cada rodada em que aquela linha for usada).

```
Leão, Tigre, Gato, Macaco
Sol, Lua, Céu
Pizza, Sushi, Hambúrguer
```

No exemplo acima:
- **Linha 1**: os civis recebem "Leão", "Tigre" ou "Gato" (sorteado); o Impostor recebe "Macaco".
- **Linha 2**: civis recebem "Sol" ou "Lua"; Impostor recebe "Céu".
- **Linha 3**: civis recebem "Pizza" ou "Sushi"; Impostor recebe "Hambúrguer".

**Cada linha vira uma rodada, na ordem em que foi digitada** — a 1ª rodada usa a linha 1, a 2ª usa a linha 2, e assim por diante. Depois de usar todas as linhas, o jogo volta para a primeira e repete a sequência. Isso permite ao host preparar uma sequência de rodadas com temas específicos para o grupo.

Deixe o campo em branco (ou não toque em **Salvar palavras**) para manter o comportamento padrão, com palavras sorteadas aleatoriamente entre as já incluídas no jogo.

## Rodando localmente

Requer [Docker](https://www.docker.com/) ou Node.js 20+.

**Com Docker (recomendado):**

```bash
docker compose up
```

**Com Node diretamente:**

```bash
npm install
npm start
```

Acesse `http://localhost:3000`.

## Deploy

O jogo mantém o estado das salas em memória e usa conexões persistentes (Socket.IO), então precisa rodar em um servidor Node sempre ativo — **não funciona em plataformas serverless como Vercel**. Recomendado: [Railway](https://railway.app/), [Render](https://render.com/) ou [Fly.io](https://fly.io/), todas com suporte nativo a processos Node persistentes e WebSockets.

No Railway: **New Project → Deploy from GitHub repo**, selecione este repositório. O deploy é automático via Nixpacks (`npm install` + `npm start`), sem configuração adicional.
