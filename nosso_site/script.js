(function () {
  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };

  /* ---------- dados ---------- */
  var TRACK = {
    design: "Design",
    video: "Vídeo",
    music: "Música",
    coreo: "Coreografia",
  };

  /* PROJETOS
     Para adicionar um projeto, copie um bloco { ... } e troque os textos.
     id: nome único | t: 'design', 'video', 'music' ou 'coreo' (coreografia) | ev: tipo de evento (usado no filtro)
     Todo projeto (design, vídeo ou música) aceita estes campos, todos opcionais:
       imagem:  'imagens/arquivo.jpg'      capa com imagem (sem o arquivo, aparece a capa colorida)
       galeria: ['imagens/a.jpg', ...]     miniaturas dentro de "Como foi feito" (clique abre a imagem)
       video:   'videos/arquivo.mp4'       player de vídeo na capa (é o campo das coreografias também)
       audio:   'audio/arquivo.mp3'        player de música na capa
       link:    'https://...'              botão que abre o projeto em outra aba (YouTube, Drive, site)
     Para usar só um link no lugar do vídeo, apague a linha "video" e escreva a linha "link".
     Sem arquivo ainda? Deixe o caminho como está: o cartão mostra o aviso para adicionar. */
  var P = [
    {
      id: "d1",
      t: "design",
      ev: "casamento",
      title: "Convite interativo de casamento",
      who: "Ana & Rafael",
      mark: "A&R",
      desc: "Convite em página web com contagem regressiva, mapa do local e botão para confirmar presença.",
      specs: ["HTML · CSS · JS", "Celular primeiro", "Confirmação de presença"],
      imagem: "imagens/convite-ana-rafael.jpg",
      galeria: [
        "imagens/convite-ana-rafael-2.jpg",
        "imagens/convite-ana-rafael-3.jpg",
      ],
      pedido:
        "Um convite que os convidados abrissem no celular, com todas as informações no mesmo lugar.",
      fiz: "Desenhei a identidade, animei a abertura e programei a contagem regressiva e o botão de confirmar presença.",
      res: "Um único link para mandar no grupo da família.",
    },
    {
      id: "d2",
      t: "design",
      ev: "15 anos",
      title: "Papelaria e monograma",
      who: "Marina, 15 anos",
      mark: "M15",
      desc: "Monograma, convite impresso, tags das lembrancinhas e placas da mesa, tudo na mesma paleta.",
      specs: ["A5 · 300 dpi", "Monograma", "Paleta própria"],
      imagem: "imagens/papelaria-marina.jpg",
      galeria: [
        "imagens/papelaria-marina-2.jpg",
        "imagens/papelaria-marina-3.jpg",
      ],
      pedido:
        "Uma identidade para a festa que não parecesse convite de catálogo.",
      fiz: "Criei o monograma a partir das iniciais e apliquei no convite, nas tags e nas placas.",
      res: "Todas as peças com a mesma cara, do convite à mesa.",
    },
    {
      id: "d3",
      t: "design",
      ev: "15 anos",
      title: "Painel e telão de abertura",
      who: "Marina, 15 anos",
      mark: "15",
      desc: "Painel de fotos na entrada e a arte que abre o telão antes do vídeo de apresentação.",
      specs: ["1920×1080", "Painel de fotos", "Mesmo estilo do convite"],
      imagem: "imagens/painel-marina.jpg",
      pedido:
        "Receber os convidados com algo que contasse quem é a aniversariante.",
      fiz: "Montei o painel de fotos e a arte de abertura do telão no mesmo estilo do convite.",
      res: "A entrada e o telão já combinavam antes do primeiro vídeo.",
    },
    {
      id: "v1",
      t: "video",
      ev: "15 anos",
      title: "Vídeo de apresentação",
      who: "Marina, 15 anos",
      desc: "Vídeo de pouco menos de três minutos com a história da aniversariante, exibido antes da entrada.",
      specs: ["1080p · 24 fps", "2:40 min", "Trilha própria", "Legendas"],
      video: "videos/apresentacao-15-anos.mp4",
      pedido:
        "Um vídeo curto para apresentar a aniversariante antes da entrada.",
      fiz: "Selecionei fotos e vídeos de cada fase, cortei no ritmo da trilha e encaixei as legendas.",
      res: "Dois minutos e quarenta que terminaram junto com a abertura das portas.",
    },
    {
      id: "v2",
      t: "video",
      ev: "casamento",
      title: "Retrospectiva do casal",
      who: "Ana & Rafael",
      desc: "Seis anos de fotos e vídeos em ordem cronológica, com narração e trilha.",
      specs: ["1080p · 24 fps", "3:10 min", "Narração", "Trilha própria"],
      video: "videos/retrospectiva-do-casal.mp4",
      pedido: "Contar a história do casal sem passar de três minutos.",
      fiz: "Organizei as fotos por época, gravei a narração e sincronizei tudo com a trilha.",
      res: "Exibida no jantar, antes dos discursos.",
    },
    {
      id: "v3",
      t: "video",
      ev: "casamento",
      title: "Highlights da cerimônia e da festa",
      who: "Ana & Rafael",
      desc: "Resumo de um minuto e quarenta e cinco para as redes, entregue na semana seguinte.",
      specs: ["1080p · 30 fps", "1:45 min", "Vertical e horizontal"],
      video: "videos/highlights-casamento.mp4",
      pedido: "Um resumo para postar logo depois do casamento.",
      fiz: "Escolhi os melhores momentos da cerimônia e da festa e exportei em dois formatos.",
      res: "Entregue em sete dias, pronto para publicar.",
    },
    {
      id: "m1",
      t: "music",
      ev: "15 anos",
      title: "Etrada da pista de dança",
      who: "festa de 15 anos da gabi",
      desc: "música animada com temporizador e edição mais complexa para pista de dança.",
      specs: ["15 anos", "emoção", "familia"],
      audio: "audio/festa.mp3",
      pedido:
        "a aniversariante escolheu as musicas, os tempos e pediu para que a gente surpreendesse todo mundo.",
      fiz: "juntei todos os audios, ajustei fade in e fade out para uma melhor sincronia entre as faixas e tempos.",
      res: "a festa foi um sucesso, foi divertida e cativante, a aniversariante e os parentes amaram.",
    },
    {
      id: "m2",
      t: "music",
      ev: "casamento",
      title: "Entrada da noiva",
      who: "Ana & Rafael",
      desc: "uma música lenta e marcante para guiar a noiva até o altar com emoção",
      specs: ["noíva", "marcante", "dia especial"],
      audio: "audio/casamento.mp3",
      pedido: "Uma entrada que marcasse esse dia para sempre.",
      fiz: "Extração de audio e pequenos ajustes para combinar com o momento.",
      res: "Música dura o tempo necessário para fazer desse, o melhor dia da vida do casal.",
    },
    {
      id: "m3",
      t: "music",
      ev: "15 anos",
      title: "Valsa da aniversariante",
      who: "Marina, 15 anos",
      desc: "Uma música emocionante para a valsa de 15 anos, com 2 tempos para dança com o principe e o rei.",
      specs: ["15 anos", "valsa", "momento"],
      audio: "audio/valsa.mp3",
      pedido: "Uma junção entre duas músicas com o tempo certo para a dança com o irmão e com o pai.",
      fiz: "Peguei as músicas escolhidas pela cliente, juntei as duas e coloquei um fade out entre ambas.",
      res: "Um momento q jamais será esquecido na vida da Marina.",
    },
  ];

  /* TRECHOS DA LINHA DO TEMPO (topo da página)
     [área, início (horas depois das 19h), fim, rótulo, id do projeto que abre ao clicar] */
  var CLIPS = [
    ["design", 0, 1.1, "Painel e placas", "d3"],
    ["design", 1.5, 2.5, "Telão de abertura", "d3"],
    ["design", 4.5, 5.6, "Lembrancinhas", "d2"],
    ["video", 0, 1.3, "Making of", "v3"],
    ["video", 1.7, 2.4, "Entrada", "v1"],
    ["video", 3.0, 4.2, "Cobertura ao vivo", "v3"],
    ["video", 4.4, 5.2, "Retrospectiva", "v2"],
    ["music", 1.7, 2.4, "Trilha da entrada", "m2"],
    ["music", 2.9, 3.9, "Valsa", "m1"],
    ["music", 4.2, 6, "Pista", "m3"],
    ["coreo", 2.9, 3.9, "Valsa", "c1"],
    ["coreo", 4.0, 4.9, "Dança dos noivos", "c2"],
    ["coreo", 5.0, 6, "Surpresa na pista", "c3"],
  ];

  /* ---------- aviso ---------- */
  $("#notice-x").addEventListener("click", function () {
    $("#notice").hidden = true;
  });

  /* ---------- cartões ---------- */
  var PLAY_ICON =
    '<svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M2 1l7 4-7 4z" fill="currentColor"/></svg>';
  var PAUSE_ICON =
    '<svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><rect x="2" y="1.5" width="2.2" height="7" fill="currentColor"/><rect x="5.8" y="1.5" width="2.2" height="7" fill="currentColor"/></svg>';

  function bars(seed) {
    var out = "";
    for (var i = 0; i < 32; i++) {
      var h =
        18 +
        Math.round(
          78 *
            Math.abs(
              Math.sin(i * 0.55 + seed) * Math.cos(i * 0.21 + seed * 0.5),
            ),
        );
      out += '<i style="--h:' + h + "%;--i:" + i + '"></i>';
    }
    return out;
  }
  function cover(p, n) {
    var k = p.t;
    var isVid = k === "video" || k === "coreo";
    var cls =
      k === "design"
        ? "c-design"
        : k === "video"
          ? "c-video"
          : k === "coreo"
            ? "c-coreo"
            : "c-music";
    var h = '<div class="cover ' + cls + '">';

    /* camada de base: depende da área */
    if (k === "design") {
      h += '<span class="mark">' + (p.mark || "") + "</span>";
    } else if (isVid) {
      h +=
        (p.link
          ? '<a class="ghost" href="' +
            p.link +
            '" target="_blank" rel="noopener" aria-label="Assistir ' +
            p.title +
            ' (abre em outra aba)"></a>'
          : '<span class="ghost"></span>') +
        '<span class="tag-chip at-tl">' +
        p.specs[0] +
        '</span><span class="tag-chip at-br">' +
        p.specs[1].replace(" min", "") +
        "</span>" +
        '<span class="vbar"><b></b></span>';
    } else {
      h += '<div class="bars" aria-hidden="true">' + bars(n + 1) + "</div>";
    }

    /* avisos de arquivo que ainda não existe (ficam escondidos quando o arquivo carrega) */
    if (isVid && !p.link) {
      h +=
        '<span class="tag-chip at-tr">Adicione o mp4</span><span class="tag-chip at-bl">' +
        (p.video || "videos/seu-video.mp4") +
        "</span>";
    } else if (p.imagem && !isVid) {
      h +=
        (p.link
          ? ""
          : '<span class="tag-chip at-tr">Adicione a imagem</span>') +
        '<span class="tag-chip at-bl">' +
        p.imagem +
        "</span>";
    }

    /* camadas de mídia por cima da capa: imagem, vídeo, música e link (todas opcionais, em qualquer área) */
    if (p.imagem)
      h += '<img class="shot" src="' + p.imagem + '" alt="' + p.title + '">';
    if (p.video)
      h +=
        '<video controls playsinline preload="metadata" src="' +
        p.video +
        '" aria-label="' +
        p.title +
        '"></video>';
    if (k === "music" || p.audio) {
      h +=
        '<audio preload="metadata"' +
        (p.audio ? ' src="' + p.audio + '"' : "") +
        "></audio>" +
        '<button type="button" class="play" aria-label="Ouvir ' +
        p.title +
        '">' +
        PLAY_ICON +
        "<span>Ouvir</span></button>" +
        '<span class="tag-chip at-br time">' +
        (p.audio || "audio/seu-arquivo.mp3") +
        '</span><span class="prog"><b></b></span>';
    }
    if (p.link) {
      h +=
        '<a class="open" href="' +
        p.link +
        '" target="_blank" rel="noopener">' +
        (isVid ? "Assistir" : "Abrir projeto") +
        "</a>";
    }
    return h + "</div>";
  }
  /* miniaturas dentro de "Como foi feito" (clique abre a imagem inteira em outra aba) */
  function gallery(p) {
    if (!p.galeria || !p.galeria.length) return "";
    return (
      '<div class="gal"><span class="k">Imagens</span><div class="thumbs">' +
      p.galeria
        .map(function (src, i) {
          return (
            '<a href="' +
            src +
            '" target="_blank" rel="noopener"><img src="' +
            src +
            '" alt="' +
            p.title +
            ", imagem " +
            (i + 1) +
            '"></a>'
          );
        })
        .join("") +
      "</div></div>"
    );
  }
  function card(p, n) {
    var specs = p.t === "video" || p.t === "coreo" ? p.specs.slice(2) : p.specs;
    return (
      '<article class="card" id="' +
      p.id +
      '" data-t="' +
      p.t +
      '" data-ev="' +
      p.ev +
      '" style="--c:var(--' +
      p.t +
      ')">' +
      cover(p, n) +
      '<div class="body"><span class="kicker">' +
      TRACK[p.t] +
      " · " +
      p.ev +
      "</span>" +
      "<h3>" +
      p.title +
      '</h3><p class="who">' +
      p.who +
      '</p><p class="desc">' +
      p.desc +
      "</p>" +
      '<div class="specs">' +
      specs
        .map(function (s) {
          return "<span>" + s + "</span>";
        })
        .join("") +
      "</div></div>" +
      '<details><summary>Como foi feito</summary><dl class="how">' +
      "<div><dt>O pedido</dt><dd>" +
      p.pedido +
      "</dd></div>" +
      "<div><dt>O que eu fiz</dt><dd>" +
      p.fiz +
      "</dd></div>" +
      "<div><dt>Resultado</dt><dd>" +
      p.res +
      "</dd></div></dl>" +
      gallery(p) +
      "</details></article>"
    );
  }
  $("#grid").innerHTML = P.map(card).join("");

  /* arquivo que não existe: tira o player ou a imagem e deixa a capa com o aviso */
  $$(".cover video, .cover img.shot").forEach(function (m) {
    function gone() {
      m.remove();
    }
    m.addEventListener("error", gone);
    if (m.error || (m.tagName === "IMG" && m.complete && m.naturalWidth === 0))
      gone();
  });
  $$(".thumbs img").forEach(function (img) {
    function gone() {
      var box = img.closest(".gal");
      img.parentNode.remove();
      if (box && !$("img", box)) box.remove();
    }
    img.addEventListener("error", gone);
    if (img.complete && img.naturalWidth === 0) gone();
  });

  /* ---------- filtros ---------- */
  var ft = "all",
    fe = "all";
  function applyFilter() {
    var shown = 0;
    $$(".card").forEach(function (c) {
      var ok =
        (ft === "all" || c.dataset.t === ft) &&
        (fe === "all" || c.dataset.ev === fe);
      c.hidden = !ok;
      if (ok) shown++;
    });
    $("#count").textContent = shown + (shown === 1 ? " projeto" : " projetos");
    $("#empty").hidden = shown > 0;
    $$("#f-track .chip").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.v === ft));
    });
    $$("#f-event .chip").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.v === fe));
    });
  }
  $("#f-track").addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    ft = b.dataset.v;
    applyFilter();
  });
  $("#f-event").addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    fe = b.dataset.v;
    applyFilter();
  });
  applyFilter();

  function jump(track, pid) {
    ft = track;
    fe = "all";
    applyFilter();
    var el = document.getElementById(pid);
    requestAnimationFrame(function () {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("flash");
      setTimeout(function () {
        el.classList.remove("flash");
      }, 1800);
    });
  }

  /* ---------- linha do tempo da festa ---------- */
  var LABEL = 128; /* igual a --label do .tl-body no style.css */
  var body = $("#tlbody"),
    flag = $("#flag"),
    ruler = $("#ruler");
  var clips = CLIPS.map(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "clip";
    b.style.cssText =
      "left:" +
      (c[1] / 6) * 100 +
      "%;width:" +
      ((c[2] - c[1]) / 6) * 100 +
      "%;--c:var(--" +
      c[0] +
      ")";
    b.title = c[3] + " (ver projeto)";
    b.textContent = c[3];
    b.addEventListener("click", function () {
      jump(c[0], c[4]);
    });
    $("#lane-" + c[0]).appendChild(b);
    return { el: b, s: c[1], e: c[2] };
  });
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function setP(v) {
    var p = Math.min(1, Math.max(0, v));
    body.style.setProperty("--p", p);
    var min = Math.round(p * 360);
    var txt = pad((19 + Math.floor(min / 60)) % 24) + ":" + pad(min % 60);
    flag.textContent = txt;
    ruler.setAttribute("aria-valuenow", min);
    ruler.setAttribute("aria-valuetext", txt);
    clips.forEach(function (c) {
      c.el.classList.toggle("live", p * 6 >= c.s && p * 6 < c.e);
    });
    body._p = p;
  }
  function fromEvent(e) {
    var r = body.getBoundingClientRect();
    setP((e.clientX - (r.left + LABEL)) / (r.width - LABEL));
  }
  body.addEventListener("pointermove", fromEvent);
  body.addEventListener("pointerdown", fromEvent);
  ruler.addEventListener("keydown", function (e) {
    var step = 5 / 360,
      p = body._p == null ? 0.31 : body._p;
    if (e.key === "ArrowRight") {
      setP(p + step);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      setP(p - step);
      e.preventDefault();
    } else if (e.key === "Home") {
      setP(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setP(1);
      e.preventDefault();
    }
  });
  setP(0.31);

  /* ---------- timecode da rolagem ---------- */
  var TOTAL = 200;
  var tc = $("#tc"),
    fill = $("#scrub-fill"),
    tick = false;
  function fmt(sec) {
    var f = Math.floor((sec % 1) * 24),
      s = Math.floor(sec) % 60,
      m = Math.floor(sec / 60) % 60,
      h = Math.floor(sec / 3600);
    return [h, m, s, f].map(pad).join(":");
  }
  function onScroll() {
    if (tick) return;
    tick = true;
    requestAnimationFrame(function () {
      tick = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pr = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      fill.style.transform = "scaleX(" + pr + ")";
      tc.textContent = fmt(pr * TOTAL);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- player dos áudios (.mp3 na pasta audio/) ---------- */
  /* só um áudio ou vídeo toca por vez */
  document.addEventListener(
    "play",
    function (e) {
      $$("audio, video").forEach(function (m) {
        if (m !== e.target) m.pause();
      });
    },
    true,
  );
  function mmss(s) {
    if (!isFinite(s)) return "0:00";
    return Math.floor(s / 60) + ":" + pad(Math.floor(s % 60));
  }
  $$(".card").forEach(function (card) {
    var a = $("audio", card);
    if (!a) return;
    var btn = $(".play", card),
      prog = $(".prog", card),
      bar = $(".prog b", card),
      chip = $(".time", card);
    var path = chip.textContent;

    function missing() {
      card.classList.add("no-audio");
      btn.disabled = true;
      btn.innerHTML = PLAY_ICON + "<span>Adicione o mp3</span>";
      chip.textContent = path;
    }
    function show() {
      var d = isFinite(a.duration) ? mmss(a.duration) : "";
      chip.textContent =
        a.currentTime > 0 && d ? mmss(a.currentTime) + " / " + d : d || path;
      bar.style.transform =
        "scaleX(" + (a.duration ? a.currentTime / a.duration : 0) + ")";
    }
    function state(on) {
      card.classList.toggle("playing", on);
      btn.innerHTML =
        (on ? PAUSE_ICON : PLAY_ICON) +
        "<span>" +
        (on ? "Pausar" : "Ouvir") +
        "</span>";
    }

    if (!a.getAttribute("src") || a.error) {
      missing();
      return;
    }
    a.addEventListener("error", missing);
    a.addEventListener("loadedmetadata", show);
    a.addEventListener("timeupdate", show);
    a.addEventListener("play", function () {
      state(true);
    });
    a.addEventListener("pause", function () {
      state(false);
    });
    a.addEventListener("ended", function () {
      a.currentTime = 0;
      state(false);
      show();
    });
    btn.addEventListener("click", function () {
      if (a.paused) {
        var r = a.play();
        if (r && r.catch)
          r.catch(function (err) {
            if (err && err.name === "NotSupportedError") missing();
          });
      } else {
        a.pause();
      }
    });
    prog.addEventListener("click", function (e) {
      if (!isFinite(a.duration)) return;
      var box = prog.getBoundingClientRect();
      a.currentTime =
        a.duration *
        Math.min(1, Math.max(0, (e.clientX - box.left) / box.width));
    });
  });

  /* ---------- copiar contato ---------- */
  $$("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var el = document.getElementById(b.dataset.target);
      var done = function (t) {
        b.textContent = t;
        setTimeout(function () {
          b.textContent = "Copiar";
        }, 1600);
      };
      var select = function () {
        var r = document.createRange();
        r.selectNodeContents(el);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        done("Selecionado");
      };
      try {
        navigator.clipboard.writeText(b.dataset.copy).then(function () {
          done("Copiado");
        }, select);
      } catch (err) {
        select();
      }
    });
  });
})();
