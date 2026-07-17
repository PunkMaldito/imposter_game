const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname, 'public')));

// ─── Word Pairs ───────────────────────────────────────────────────────────────

const WORD_PAIRS = [
  // Animais
  { civilian: 'Leão',        imposter: 'Tigre',          category: 'Animais' },
  { civilian: 'Golfinho',    imposter: 'Baleia',          category: 'Animais' },
  { civilian: 'Cachorro',    imposter: 'Lobo',            category: 'Animais' },
  { civilian: 'Gato',        imposter: 'Leopardo',        category: 'Animais' },
  { civilian: 'Elefante',    imposter: 'Hipopótamo',      category: 'Animais' },
  { civilian: 'Pinguim',     imposter: 'Pato',            category: 'Animais' },
  { civilian: 'Tubarão',     imposter: 'Arraia',          category: 'Animais' },
  { civilian: 'Cobra',       imposter: 'Lagarto',         category: 'Animais' },
  { civilian: 'Urso',        imposter: 'Gorila',          category: 'Animais' },
  { civilian: 'Coelho',      imposter: 'Esquilo',         category: 'Animais' },
  { civilian: 'Cavalo',      imposter: 'Zebra',           category: 'Animais' },
  { civilian: 'Papagaio',    imposter: 'Tucano',          category: 'Animais' },
  // Comida
  { civilian: 'Pizza',       imposter: 'Calzone',         category: 'Comida' },
  { civilian: 'Hambúrguer',  imposter: 'Hot Dog',         category: 'Comida' },
  { civilian: 'Sushi',       imposter: 'Temaki',          category: 'Comida' },
  { civilian: 'Sorvete',     imposter: 'Picolé',          category: 'Comida' },
  { civilian: 'Bolo',        imposter: 'Torta',           category: 'Comida' },
  { civilian: 'Macarrão',    imposter: 'Nhoque',          category: 'Comida' },
  { civilian: 'Pão de Queijo', imposter: 'Coxinha',       category: 'Comida' },
  { civilian: 'Churrasco',   imposter: 'Espetinho',       category: 'Comida' },
  { civilian: 'Brigadeiro',  imposter: 'Trufa',           category: 'Comida' },
  { civilian: 'Tapioca',     imposter: 'Crepe',           category: 'Comida' },
  { civilian: 'Pastel',      imposter: 'Empada',          category: 'Comida' },
  { civilian: 'Feijoada',    imposter: 'Cozido',          category: 'Comida' },
  { civilian: 'Açaí',        imposter: 'Vitamina',        category: 'Comida' },
  // Lugares
  { civilian: 'Praia',       imposter: 'Piscina',         category: 'Lugares' },
  { civilian: 'Hospital',    imposter: 'Clínica',         category: 'Lugares' },
  { civilian: 'Shopping',    imposter: 'Mercado',         category: 'Lugares' },
  { civilian: 'Estádio',     imposter: 'Ginásio',         category: 'Lugares' },
  { civilian: 'Hotel',       imposter: 'Pousada',         category: 'Lugares' },
  { civilian: 'Aeroporto',   imposter: 'Rodoviária',      category: 'Lugares' },
  { civilian: 'Igreja',      imposter: 'Templo',          category: 'Lugares' },
  { civilian: 'Museu',       imposter: 'Galeria',         category: 'Lugares' },
  { civilian: 'Parque',      imposter: 'Praça',           category: 'Lugares' },
  { civilian: 'Escola',      imposter: 'Universidade',    category: 'Lugares' },
  { civilian: 'Farmácia',    imposter: 'Laboratório',     category: 'Lugares' },
  // Objetos
  { civilian: 'Celular',     imposter: 'Tablet',          category: 'Objetos' },
  { civilian: 'Guitarra',    imposter: 'Violão',          category: 'Objetos' },
  { civilian: 'Óculos',      imposter: 'Lupa',            category: 'Objetos' },
  { civilian: 'Caderno',     imposter: 'Agenda',          category: 'Objetos' },
  { civilian: 'Relógio',     imposter: 'Cronômetro',      category: 'Objetos' },
  { civilian: 'Mochila',     imposter: 'Maleta',          category: 'Objetos' },
  { civilian: 'Espelho',     imposter: 'Moldura',         category: 'Objetos' },
  { civilian: 'Geladeira',   imposter: 'Freezer',         category: 'Objetos' },
  { civilian: 'Sofá',        imposter: 'Poltrona',        category: 'Objetos' },
  { civilian: 'Violino',     imposter: 'Viola',           category: 'Objetos' },
  // Esportes
  { civilian: 'Futebol',     imposter: 'Rugby',           category: 'Esportes' },
  { civilian: 'Natação',     imposter: 'Polo Aquático',   category: 'Esportes' },
  { civilian: 'Tênis',       imposter: 'Badminton',       category: 'Esportes' },
  { civilian: 'Basquete',    imposter: 'Handebol',        category: 'Esportes' },
  { civilian: 'Vôlei',       imposter: 'Futevôlei',       category: 'Esportes' },
  { civilian: 'Ciclismo',    imposter: 'Skate',           category: 'Esportes' },
  { civilian: 'Boxe',        imposter: 'Jiu-Jitsu',       category: 'Esportes' },
  { civilian: 'Surfe',       imposter: 'Wakeboard',       category: 'Esportes' },
  { civilian: 'Xadrez',      imposter: 'Damas',           category: 'Esportes' },
  { civilian: 'Golfe',       imposter: 'Boliche',         category: 'Esportes' },
  // Profissões
  { civilian: 'Médico',      imposter: 'Dentista',        category: 'Profissões' },
  { civilian: 'Professor',   imposter: 'Pedagogo',        category: 'Profissões' },
  { civilian: 'Chef',        imposter: 'Padeiro',         category: 'Profissões' },
  { civilian: 'Policial',    imposter: 'Segurança',       category: 'Profissões' },
  { civilian: 'Arquiteto',   imposter: 'Engenheiro',      category: 'Profissões' },
  { civilian: 'Fotógrafo',   imposter: 'Cinegrafista',    category: 'Profissões' },
  { civilian: 'Astronauta',  imposter: 'Piloto',          category: 'Profissões' },
  { civilian: 'Bombeiro',    imposter: 'Salva-Vidas',     category: 'Profissões' },
  // Entretenimento
  { civilian: 'Cinema',      imposter: 'Teatro',          category: 'Entretenimento' },
  { civilian: 'Série',       imposter: 'Novela',          category: 'Entretenimento' },
  { civilian: 'Videogame',   imposter: 'Arcade',          category: 'Entretenimento' },
  { civilian: 'Show de Rock', imposter: 'Festival',       category: 'Entretenimento' },
  { civilian: 'Circo',       imposter: 'Parque de Diversões', category: 'Entretenimento' },
  { civilian: 'Podcast',     imposter: 'Rádio',           category: 'Entretenimento' },
  // Natureza
  { civilian: 'Cachoeira',   imposter: 'Rio',             category: 'Natureza' },
  { civilian: 'Vulcão',      imposter: 'Montanha',        category: 'Natureza' },
  { civilian: 'Floresta',    imposter: 'Selva',           category: 'Natureza' },
  { civilian: 'Deserto',     imposter: 'Savana',          category: 'Natureza' },
  { civilian: 'Furacão',     imposter: 'Tornado',         category: 'Natureza' },
  { civilian: 'Coral',       imposter: 'Alga',            category: 'Natureza' },
  // Veículos
  { civilian: 'Avião',       imposter: 'Helicóptero',     category: 'Veículos' },
  { civilian: 'Carro',       imposter: 'Moto',            category: 'Veículos' },
  { civilian: 'Barco',       imposter: 'Jet Ski',         category: 'Veículos' },
  { civilian: 'Trem',        imposter: 'Metrô',           category: 'Veículos' },
  { civilian: 'Ônibus',      imposter: 'Van',             category: 'Veículos' },
];

// ─── Room Helpers ─────────────────────────────────────────────────────────────

const rooms = new Map();

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code;
  do {
    code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (rooms.has(code));
  return code;
}

function randomPair(room) {
  const pool = (room.customPairs && room.customPairs.length) ? room.customPairs : WORD_PAIRS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function parseCustomWords(text) {
  const pairs = [];
  for (const line of (text || '').split('\n')) {
    const words = line.split(',').map(s => s.trim()).filter(Boolean).map(w => w.substring(0, 30));
    if (words.length < 2) continue;
    const imposter = words[words.length - 1];
    for (const civilian of words.slice(0, -1)) {
      pairs.push({ civilian, imposter, category: 'Personalizado' });
    }
  }
  return pairs.slice(0, 200);
}

function publicPlayers(room) {
  return Array.from(room.players.values()).map(p => ({
    token: p.token,
    name: p.name,
    isHost: p.isHost,
    isOnline: p.isOnline,
    hasClued: p.hasClued,
    hasVoted: p.hasVoted,
    clue: p.clue || null,
    isReady: p.isReady,
  }));
}

function resetPlayer(player) {
  player.word = null;
  player.isImposter = false;
  player.clue = null;
  player.hasClued = false;
  player.vote = null;
  player.hasVoted = false;
  player.isReady = false;
}

// ─── Socket.IO ────────────────────────────────────────────────────────────────

io.on('connection', (socket) => {
  // CREATE ROOM
  socket.on('create-room', ({ name, token }) => {
    if (!name || !token) return;
    const code = generateCode();
    const room = {
      code, hostToken: token,
      players: new Map(),
      state: 'lobby',
      wordPair: null, imposterCount: 1,
      customPairs: [], customWordsText: '',
      clueOrder: [], clueIndex: 0, readyCount: 0,
      lastResults: null,
    };
    room.players.set(token, {
      token, name: name.trim().substring(0, 20),
      socketId: socket.id, isHost: true, isOnline: true,
      word: null, isImposter: false,
      clue: null, hasClued: false,
      vote: null, hasVoted: false, isReady: false,
    });
    rooms.set(code, room);
    socket.join(code);
    socket.emit('room-created', { code });
    socket.emit('lobby-update', { players: publicPlayers(room), isHost: true, imposterCount: 1, customWordsCount: 0, code });
    console.log(`[+] Room ${code} created by "${name}"`);
  });

  // JOIN ROOM
  socket.on('join-room', ({ code, name, token }) => {
    if (!code || !name || !token) return;
    const upper = code.toUpperCase().trim();
    const room = rooms.get(upper);

    if (!room) {
      socket.emit('error', { message: 'Sala não encontrada. Verifique o código.' });
      return;
    }

    // Reconnect existing player
    if (room.players.has(token)) {
      const player = room.players.get(token);
      player.socketId = socket.id;
      player.isOnline = true;
      socket.join(upper);

      const restore = {
        state: room.state, code: upper,
        players: publicPlayers(room),
        isHost: player.isHost,
        imposterCount: room.imposterCount,
        customWordsCount: room.customPairs.length,
        customWordsText: player.isHost ? room.customWordsText : undefined,
        word: player.word,
        isImposter: player.isImposter,
        category: room.wordPair?.category,
        clueOrder: room.clueOrder.map(t => ({ token: t, name: room.players.get(t)?.name })),
        clueIndex: room.clueIndex,
        clues: room.clueOrder.map(t => {
          const p = room.players.get(t);
          return { token: t, name: p?.name, clue: p?.clue || null };
        }),
        results: room.lastResults,
      };
      socket.emit('state-restore', restore);
      io.to(upper).emit('player-online', { token, name: player.name });
      console.log(`[r] "${player.name}" rejoined ${upper}`);
      return;
    }

    if (room.state !== 'lobby') {
      socket.emit('error', { message: 'O jogo já começou. Não é possível entrar agora.' });
      return;
    }
    if (room.players.size >= 20) {
      socket.emit('error', { message: 'A sala está cheia (máximo 20 jogadores).' });
      return;
    }

    room.players.set(token, {
      token, name: name.trim().substring(0, 20),
      socketId: socket.id, isHost: false, isOnline: true,
      word: null, isImposter: false,
      clue: null, hasClued: false,
      vote: null, hasVoted: false, isReady: false,
    });

    socket.join(upper);
    socket.emit('room-joined', { code: upper, isHost: false, imposterCount: room.imposterCount, customWordsCount: room.customPairs.length, players: publicPlayers(room) });
    io.to(upper).emit('lobby-update', { players: publicPlayers(room), imposterCount: room.imposterCount, customWordsCount: room.customPairs.length, code: upper });
    console.log(`[+] "${name}" joined ${upper}`);
  });

  // UPDATE SETTINGS (host only)
  socket.on('update-settings', ({ code, token, imposterCount }) => {
    const room = rooms.get(code);
    if (!room || room.hostToken !== token || room.state !== 'lobby') return;
    const max = Math.max(1, Math.floor((room.players.size - 1) / 2));
    room.imposterCount = Math.max(1, Math.min(imposterCount, max));
    io.to(code).emit('lobby-update', { players: publicPlayers(room), imposterCount: room.imposterCount, customWordsCount: room.customPairs.length, code });
  });

  // UPDATE CUSTOM WORDS (host only)
  socket.on('update-words', ({ code, token, wordsText }) => {
    const room = rooms.get(code);
    if (!room || room.hostToken !== token || room.state !== 'lobby') return;
    room.customWordsText = (wordsText || '').substring(0, 10000);
    room.customPairs = parseCustomWords(room.customWordsText);
    socket.emit('words-updated', { customWordsCount: room.customPairs.length });
    io.to(code).emit('lobby-update', { players: publicPlayers(room), imposterCount: room.imposterCount, customWordsCount: room.customPairs.length, code });
  });

  // START GAME (host only)
  socket.on('start-game', ({ code, token }) => {
    const room = rooms.get(code);
    if (!room || room.hostToken !== token || room.state !== 'lobby') return;
    if (room.players.size < 3) {
      socket.emit('error', { message: 'Precisa de pelo menos 3 jogadores para começar.' });
      return;
    }

    room.state = 'revealing';
    room.wordPair = randomPair(room);
    room.readyCount = 0;

    const tokens = Array.from(room.players.keys());
    const shuffled = [...tokens].sort(() => Math.random() - 0.5);
    const imposterTokens = new Set(shuffled.slice(0, room.imposterCount));
    room.clueOrder = [...tokens].sort(() => Math.random() - 0.5);
    room.clueIndex = 0;

    for (const [t, player] of room.players) {
      resetPlayer(player);
      player.isImposter = imposterTokens.has(t);
      player.word = player.isImposter ? room.wordPair.imposter : room.wordPair.civilian;
    }

    const clueOrderPublic = room.clueOrder.map(t => ({ token: t, name: room.players.get(t).name }));

    for (const [, player] of room.players) {
      if (player.isOnline && player.socketId) {
        io.to(player.socketId).emit('game-started', {
          word: player.word,
          isImposter: player.isImposter,
          category: room.wordPair.category,
          clueOrder: clueOrderPublic,
          players: publicPlayers(room),
          imposterCount: room.imposterCount,
        });
      }
    }
    console.log(`[>] Game started in ${code}: "${room.wordPair.civilian}" vs "${room.wordPair.imposter}"`);
  });

  // PLAYER READY (saw their word)
  socket.on('player-ready', ({ code, token }) => {
    const room = rooms.get(code);
    if (!room || room.state !== 'revealing') return;
    const player = room.players.get(token);
    if (!player || player.isReady) return;

    player.isReady = true;
    room.readyCount++;

    const onlineCount = Array.from(room.players.values()).filter(p => p.isOnline).length;
    io.to(code).emit('ready-update', { readyCount: room.readyCount, total: onlineCount, players: publicPlayers(room) });

    if (room.readyCount >= onlineCount) {
      room.state = 'cluing';
      io.to(code).emit('cluing-started', {
        currentToken: room.clueOrder[0],
        clueOrder: room.clueOrder.map(t => ({ token: t, name: room.players.get(t).name })),
      });
    }
  });

  // SUBMIT CLUE
  socket.on('submit-clue', ({ code, token, clue }) => {
    const room = rooms.get(code);
    if (!room || room.state !== 'cluing') return;
    if (room.clueOrder[room.clueIndex] !== token) return;
    const player = room.players.get(token);
    if (!player || player.hasClued) return;

    const cleaned = (clue || '').trim().substring(0, 30);
    if (!cleaned) return;

    player.clue = cleaned;
    player.hasClued = true;
    room.clueIndex++;

    const nextToken = room.clueIndex < room.clueOrder.length ? room.clueOrder[room.clueIndex] : null;
    io.to(code).emit('clue-submitted', { token, name: player.name, clue: cleaned, nextToken, clueIndex: room.clueIndex, players: publicPlayers(room) });

    if (!nextToken) {
      room.state = 'voting';
      const clues = room.clueOrder.map(t => { const p = room.players.get(t); return { token: t, name: p.name, clue: p.clue }; });
      setTimeout(() => io.to(code).emit('voting-started', { clues }), 1200);
    }
  });

  // SKIP CLUE (host only — to unblock an AFK player)
  socket.on('skip-clue', ({ code, token }) => {
    const room = rooms.get(code);
    if (!room || room.state !== 'cluing' || room.hostToken !== token) return;

    const currentToken = room.clueOrder[room.clueIndex];
    const currentPlayer = room.players.get(currentToken);
    if (currentPlayer && !currentPlayer.hasClued) {
      currentPlayer.clue = '—';
      currentPlayer.hasClued = true;
    }
    room.clueIndex++;

    const nextToken = room.clueIndex < room.clueOrder.length ? room.clueOrder[room.clueIndex] : null;
    io.to(code).emit('clue-submitted', { token: currentToken, name: currentPlayer?.name, clue: '—', nextToken, clueIndex: room.clueIndex, players: publicPlayers(room) });

    if (!nextToken) {
      room.state = 'voting';
      const clues = room.clueOrder.map(t => { const p = room.players.get(t); return { token: t, name: p.name, clue: p.clue }; });
      setTimeout(() => io.to(code).emit('voting-started', { clues }), 1200);
    }
  });

  // SUBMIT VOTE
  socket.on('submit-vote', ({ code, token, votedToken }) => {
    const room = rooms.get(code);
    if (!room || room.state !== 'voting') return;
    if (token === votedToken) return;
    const player = room.players.get(token);
    if (!player || player.hasVoted) return;
    if (!room.players.has(votedToken)) return;

    player.vote = votedToken;
    player.hasVoted = true;

    const onlineCount = Array.from(room.players.values()).filter(p => p.isOnline).length;
    const votedCount = Array.from(room.players.values()).filter(p => p.hasVoted).length;
    io.to(code).emit('vote-update', { votedCount, total: onlineCount, players: publicPlayers(room) });

    if (votedCount >= onlineCount) {
      const counts = new Map();
      for (const [t] of room.players) counts.set(t, 0);
      for (const [, p] of room.players) {
        if (p.vote) counts.set(p.vote, (counts.get(p.vote) || 0) + 1);
      }

      let maxVotes = 0, eliminated = null, tie = false;
      for (const [t, cnt] of counts) {
        if (cnt > maxVotes) { maxVotes = cnt; eliminated = t; tie = false; }
        else if (cnt === maxVotes && maxVotes > 0) { tie = true; }
      }
      if (tie) eliminated = null;

      const imposters = Array.from(room.players.values()).filter(p => p.isImposter).map(p => ({ token: p.token, name: p.name }));
      const eliminatedPlayer = eliminated ? room.players.get(eliminated) : null;
      const civilianWin = eliminatedPlayer?.isImposter === true;

      const results = {
        eliminated: eliminatedPlayer ? { token: eliminated, name: eliminatedPlayer.name, isImposter: eliminatedPlayer.isImposter } : null,
        tie, imposters, civilianWin,
        civilianWord: room.wordPair.civilian,
        imposterWord: room.wordPair.imposter,
        category: room.wordPair.category,
        votes: Array.from(counts.entries()).map(([t, cnt]) => ({ token: t, name: room.players.get(t).name, votes: cnt })).sort((a, b) => b.votes - a.votes),
        playerWords: Array.from(room.players.values()).map(p => ({ token: p.token, name: p.name, word: p.word, isImposter: p.isImposter })),
      };

      room.state = 'results';
      room.lastResults = results;
      io.to(code).emit('game-results', results);
    }
  });

  // PLAY AGAIN (host only)
  socket.on('play-again', ({ code, token }) => {
    const room = rooms.get(code);
    if (!room || room.hostToken !== token || room.state !== 'results') return;
    room.state = 'lobby';
    room.wordPair = null;
    room.clueOrder = [];
    room.clueIndex = 0;
    room.readyCount = 0;
    room.lastResults = null;
    for (const [, player] of room.players) resetPlayer(player);
    io.to(code).emit('back-to-lobby', { players: publicPlayers(room), imposterCount: room.imposterCount, customWordsCount: room.customPairs.length, code });
  });

  // DISCONNECT
  socket.on('disconnect', () => {
    for (const [code, room] of rooms) {
      for (const [token, player] of room.players) {
        if (player.socketId === socket.id) {
          player.isOnline = false;
          io.to(code).emit('player-offline', { token, name: player.name });
          // Clean up room if everyone is gone for 10 min
          setTimeout(() => {
            if (!rooms.has(code)) return;
            const anyOnline = Array.from(room.players.values()).some(p => p.isOnline);
            if (!anyOnline) { rooms.delete(code); console.log(`[-] Room ${code} cleaned up`); }
          }, 10 * 60 * 1000);
          return;
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🕵️  O Impostor rodando em http://localhost:${PORT}\n`);
});
