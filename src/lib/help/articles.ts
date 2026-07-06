import type { Article } from "./types";

/**
 * Seed tri-língue (ES/PT/EN) do Centro de Ayuda. Cada artigo é um objeto tipado;
 * o corpo é um Block[] renderizado por ArticleBody. Adicionar artigo = adicionar
 * um objeto aqui (+ rodar `npm run build` pra validar tipos e i18n).
 */
export const HELP_ARTICLES: readonly Article[] = [
  // ─────────────────────────── PRIMEROS PASOS ───────────────────────────
  {
    slug: "migrar-desde-dentalink",
    categoryId: "primeros-pasos",
    updated: "2026-07-01",
    readingMinutes: 8,
    featured: true,
    keywords: ["dentalink", "migracion", "migração", "importar", "traspaso", "cambio"],
    related: ["configurar-tu-clinica", "activar-agenda-publica"],
    title: {
      es: "Migrar desde Dentalink en 5 pasos",
      pt: "Migrar do Dentalink em 5 passos",
      en: "Migrate from Dentalink in 5 steps",
    },
    excerpt: {
      es: "Trae pacientes, historia y agenda desde Dentalink sin perder información ni tiempo de atención.",
      pt: "Traga pacientes, histórico e agenda do Dentalink sem perder informação nem tempo de atendimento.",
      en: "Bring patients, history and schedule from Dentalink without losing data or clinic time.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Cambiar de sistema asusta, pero la migración desde Dentalink está pensada para que no pierdas nada: pacientes, fichas, tratamientos y agenda llegan a SuperClini listos para usar. Este es el camino completo.",
          pt: "Trocar de sistema assusta, mas a migração do Dentalink foi pensada para você não perder nada: pacientes, fichas, tratamentos e agenda chegam ao SuperClini prontos para usar. Este é o caminho completo.",
          en: "Switching systems is scary, but migrating from Dentalink is built so you lose nothing: patients, charts, treatments and schedule arrive in SuperClini ready to use. Here's the full path.",
        },
      },
      {
        type: "illustration",
        illustration: "flujo-migracion",
        caption: {
          es: "Exportas de Dentalink, nosotros mapeamos y validas antes de activar.",
          pt: "Você exporta do Dentalink, nós mapeamos e você valida antes de ativar.",
          en: "You export from Dentalink, we map it and you validate before going live.",
        },
      },
      {
        type: "h2",
        text: { es: "Antes de empezar", pt: "Antes de começar", en: "Before you start" },
      },
      {
        type: "list",
        items: [
          {
            es: "Ten a mano el usuario administrador de tu Dentalink actual.",
            pt: "Tenha em mãos o usuário administrador do seu Dentalink atual.",
            en: "Have the administrator user of your current Dentalink at hand.",
          },
          {
            es: "Define una fecha de corte: hasta ese día se factura en Dentalink, desde el siguiente en SuperClini.",
            pt: "Defina uma data de corte: até esse dia fatura no Dentalink, a partir do seguinte no SuperClini.",
            en: "Set a cutover date: bill in Dentalink until that day, in SuperClini from the next one.",
          },
        ],
      },
      {
        type: "h2",
        text: { es: "El proceso", pt: "O processo", en: "The process" },
      },
      {
        type: "steps",
        items: [
          {
            es: "Solicita la exportación de datos en Dentalink (pacientes, historia y agenda).",
            pt: "Solicite a exportação de dados no Dentalink (pacientes, histórico e agenda).",
            en: "Request the data export in Dentalink (patients, history and schedule).",
          },
          {
            es: "Súbela en Ajustes → Migración. Detectamos el formato automáticamente.",
            pt: "Envie em Ajustes → Migração. Detectamos o formato automaticamente.",
            en: "Upload it under Settings → Migration. We detect the format automatically.",
          },
          {
            es: "Revisa el resumen: cuántos pacientes, fichas y citas se van a importar.",
            pt: "Revise o resumo: quantos pacientes, fichas e consultas serão importados.",
            en: "Review the summary: how many patients, charts and appointments will be imported.",
          },
          {
            es: "Confirma. La importación corre en segundo plano y te avisa al terminar.",
            pt: "Confirme. A importação roda em segundo plano e avisa ao terminar.",
            en: "Confirm. The import runs in the background and notifies you when done.",
          },
          {
            es: "Valida una muestra de pacientes y activa tu agenda pública.",
            pt: "Valide uma amostra de pacientes e ative sua agenda pública.",
            en: "Validate a sample of patients and turn on your public agenda.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: { es: "Sin doble carga", pt: "Sem carga dupla", en: "No double entry" },
        text: {
          es: "Durante la migración no necesitas registrar nada dos veces: trabaja normal en Dentalink hasta la fecha de corte.",
          pt: "Durante a migração você não precisa registrar nada duas vezes: trabalhe normal no Dentalink até a data de corte.",
          en: "During migration you never enter anything twice: keep working normally in Dentalink until the cutover date.",
        },
      },
    ],
  },
  {
    slug: "configurar-tu-clinica",
    categoryId: "primeros-pasos",
    updated: "2026-06-20",
    readingMinutes: 5,
    keywords: ["configuracion", "clinica", "clínica", "setup", "zona horaria", "sucursal"],
    related: ["migrar-desde-dentalink", "usuarios-y-permisos"],
    title: {
      es: "Configura tu clínica en 10 minutos",
      pt: "Configure sua clínica em 10 minutos",
      en: "Set up your clinic in 10 minutes",
    },
    excerpt: {
      es: "Datos, horario de atención, zona horaria y profesionales: lo mínimo para empezar a agendar.",
      pt: "Dados, horário de atendimento, fuso horário e profissionais: o mínimo para começar a agendar.",
      en: "Details, opening hours, time zone and professionals: the minimum to start booking.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "La configuración inicial define cómo funciona todo lo demás. Vale la pena dedicarle diez minutos bien puestos.",
          pt: "A configuração inicial define como tudo o resto funciona. Vale a pena dedicar dez minutos bem gastos.",
          en: "The initial setup defines how everything else works. It's worth ten well-spent minutes.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "En Ajustes → Clínica, completa nombre, dirección y logo.",
            pt: "Em Ajustes → Clínica, preencha nome, endereço e logo.",
            en: "Under Settings → Clinic, fill in name, address and logo.",
          },
          {
            es: "Define la zona horaria de tu país: de ella dependen agenda, recordatorios y reportes.",
            pt: "Defina o fuso horário do seu país: dele dependem agenda, lembretes e relatórios.",
            en: "Set your country's time zone: agenda, reminders and reports all depend on it.",
          },
          {
            es: "Configura el horario de atención por día de la semana.",
            pt: "Configure o horário de atendimento por dia da semana.",
            en: "Configure opening hours per weekday.",
          },
          {
            es: "Agrega a tus profesionales e invita al equipo.",
            pt: "Adicione seus profissionais e convide a equipe.",
            en: "Add your professionals and invite the team.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: { es: "La zona horaria primero", pt: "O fuso horário primeiro", en: "Time zone first" },
        text: {
          es: "Configúrala antes de crear citas. Si la cambias después, revisa que los horarios existentes queden correctos.",
          pt: "Configure-o antes de criar consultas. Se mudar depois, confira se os horários existentes ficam corretos.",
          en: "Set it before creating appointments. If you change it later, check that existing times stay correct.",
        },
      },
    ],
  },

  // ─────────────────────────────── SOFÍA ───────────────────────────────
  {
    slug: "configurar-sofia-whatsapp",
    categoryId: "sofia",
    updated: "2026-07-01",
    readingMinutes: 6,
    featured: true,
    keywords: ["sofia", "whatsapp", "ia", "bot", "agente", "qr", "conectar", "evolution"],
    related: ["definir-allowlist-sofia", "activar-agenda-publica"],
    title: {
      es: "Cómo configurar a Sofía para responder en WhatsApp",
      pt: "Como configurar a Sofía para responder no WhatsApp",
      en: "How to set up Sofía to reply on WhatsApp",
    },
    excerpt: {
      es: "Deja a tu asistente de IA atendiendo WhatsApp y agendando citas en menos de 10 minutos.",
      pt: "Deixe seu assistente de IA atendendo o WhatsApp e agendando consultas em menos de 10 minutos.",
      en: "Get your AI assistant answering WhatsApp and booking appointments in under 10 minutes.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Sofía es tu asistente de IA que atiende WhatsApp, agenda citas y responde dudas frecuentes las 24 horas. En esta guía la dejas funcionando rápido, tú siempre con el control.",
          pt: "Sofía é seu assistente de IA que atende o WhatsApp, agenda consultas e responde dúvidas frequentes 24 horas. Neste guia você a deixa funcionando rápido, você sempre no controle.",
          en: "Sofía is your AI assistant that answers WhatsApp, books appointments and handles FAQs 24/7. In this guide you get her running fast, with you always in control.",
        },
      },
      {
        type: "h2",
        text: { es: "Antes de empezar", pt: "Antes de começar", en: "Before you start" },
      },
      {
        type: "p",
        text: {
          es: "Necesitas un número de WhatsApp dedicado a la clínica y el rol de administrador en SuperClini.",
          pt: "Você precisa de um número de WhatsApp dedicado à clínica e o papel de administrador no SuperClini.",
          en: "You need a WhatsApp number dedicated to the clinic and the administrator role in SuperClini.",
        },
      },
      {
        type: "illustration",
        illustration: "flujo-sofia",
        caption: {
          es: "El paciente escribe, Sofía responde y agenda, tu equipo confirma en la agenda.",
          pt: "O paciente escreve, Sofía responde e agenda, sua equipe confirma na agenda.",
          en: "The patient writes, Sofía replies and books, your team confirms in the agenda.",
        },
      },
      {
        type: "h2",
        text: { es: "Conectar WhatsApp", pt: "Conectar o WhatsApp", en: "Connect WhatsApp" },
      },
      {
        type: "steps",
        items: [
          {
            es: "Entra en Ajustes → Sofía y pulsa «Conectar número».",
            pt: "Entre em Ajustes → Sofía e clique em «Conectar número».",
            en: "Go to Settings → Sofía and click “Connect number”.",
          },
          {
            es: "Escanea el código QR con el WhatsApp de la clínica.",
            pt: "Escaneie o código QR com o WhatsApp da clínica.",
            en: "Scan the QR code with the clinic's WhatsApp.",
          },
          {
            es: "Espera el estado «Conectado» en verde. Listo: Sofía ya escucha.",
            pt: "Aguarde o status «Conectado» em verde. Pronto: a Sofía já escuta.",
            en: "Wait for the green “Connected” status. Done: Sofía is now listening.",
          },
        ],
      },
      {
        type: "callout",
        tone: "success",
        title: { es: "Tú decides, siempre", pt: "Você decide, sempre", en: "You decide, always" },
        text: {
          es: "Sofía nunca cierra una cita fuera de las reglas que definiste. Puedes pausarla con un toque y retomar cuando quieras.",
          pt: "A Sofía nunca fecha uma consulta fora das regras que você definiu. Você pode pausá-la com um toque e retomar quando quiser.",
          en: "Sofía never books outside the rules you set. You can pause her with one tap and resume whenever you want.",
        },
      },
      {
        type: "faq",
        items: [
          {
            q: {
              es: "¿Puedo usar mi número personal?",
              pt: "Posso usar meu número pessoal?",
              en: "Can I use my personal number?",
            },
            a: {
              es: "Recomendamos un número dedicado a la clínica para separar la atención de tu vida personal.",
              pt: "Recomendamos um número dedicado à clínica para separar o atendimento da sua vida pessoal.",
              en: "We recommend a number dedicated to the clinic to keep patient care separate from your personal life.",
            },
          },
          {
            q: {
              es: "¿Sofía responde de madrugada?",
              pt: "A Sofía responde de madrugada?",
              en: "Does Sofía reply at night?",
            },
            a: {
              es: "Sí, atiende 24/7. Puedes definir un mensaje distinto para el horario en que la clínica está cerrada.",
              pt: "Sim, atende 24/7. Você pode definir uma mensagem diferente para o horário em que a clínica está fechada.",
              en: "Yes, she works 24/7. You can set a different message for hours when the clinic is closed.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "definir-allowlist-sofia",
    categoryId: "sofia",
    updated: "2026-06-18",
    readingMinutes: 4,
    keywords: ["allowlist", "numeros", "números", "permitir", "grupos", "spam", "seguridad"],
    related: ["configurar-sofia-whatsapp"],
    title: {
      es: "Controlar a quién responde Sofía (allowlist)",
      pt: "Controlar para quem a Sofía responde (allowlist)",
      en: "Control who Sofía replies to (allowlist)",
    },
    excerpt: {
      es: "Define qué números o grupos puede atender Sofía para evitar respuestas no deseadas.",
      pt: "Defina quais números ou grupos a Sofía pode atender para evitar respostas indesejadas.",
      en: "Define which numbers or groups Sofía can handle to avoid unwanted replies.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "La allowlist es tu filtro de seguridad: decide en qué conversaciones participa Sofía y en cuáles se mantiene en silencio.",
          pt: "A allowlist é seu filtro de segurança: decide em quais conversas a Sofía participa e em quais fica em silêncio.",
          en: "The allowlist is your safety filter: it decides which conversations Sofía joins and which she stays silent in.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Abre Ajustes → Sofía → Allowlist.",
            pt: "Abra Ajustes → Sofía → Allowlist.",
            en: "Open Settings → Sofía → Allowlist.",
          },
          {
            es: "Elige el modo: responder a todos, o solo a la lista permitida.",
            pt: "Escolha o modo: responder a todos, ou só à lista permitida.",
            en: "Choose the mode: reply to everyone, or only to the allowed list.",
          },
          {
            es: "Agrega números o grupos y guarda.",
            pt: "Adicione números ou grupos e salve.",
            en: "Add numbers or groups and save.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "En grupos, Sofía solo responde si la mencionan. Así no interrumpe conversaciones internas del equipo.",
          pt: "Em grupos, a Sofía só responde se for mencionada. Assim não interrompe conversas internas da equipe.",
          en: "In groups, Sofía only replies when mentioned. That way she never interrupts internal team chats.",
        },
      },
    ],
  },

  // ─────────────────────────────── AGENDA ───────────────────────────────
  {
    slug: "activar-agenda-publica",
    categoryId: "agenda",
    updated: "2026-06-25",
    readingMinutes: 6,
    featured: true,
    keywords: ["agenda publica", "agenda pública", "reservas online", "link", "horizonte", "bloqueos"],
    related: ["configurar-sofia-whatsapp", "configurar-tu-clinica"],
    title: {
      es: "Activar la agenda pública de reservas",
      pt: "Ativar a agenda pública de reservas",
      en: "Turn on the public booking agenda",
    },
    excerpt: {
      es: "Un enlace para que tus pacientes reserven solos, respetando tus horarios y bloqueos.",
      pt: "Um link para seus pacientes reservarem sozinhos, respeitando seus horários e bloqueios.",
      en: "A link for patients to book on their own, respecting your hours and blocks.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "La agenda pública es un enlace que compartes en tu Instagram, web o WhatsApp. El paciente ve tus horarios reales y reserva sin llamar.",
          pt: "A agenda pública é um link que você compartilha no Instagram, site ou WhatsApp. O paciente vê seus horários reais e reserva sem ligar.",
          en: "The public agenda is a link you share on Instagram, your site or WhatsApp. Patients see your real availability and book without calling.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Ve a Ajustes → Agenda pública y actívala.",
            pt: "Vá em Ajustes → Agenda pública e ative-a.",
            en: "Go to Settings → Public agenda and enable it.",
          },
          {
            es: "Define el horizonte de reserva (por ejemplo, hasta 60 días adelante).",
            pt: "Defina o horizonte de reserva (por exemplo, até 60 dias à frente).",
            en: "Set the booking horizon (for example, up to 60 days ahead).",
          },
          {
            es: "Elige qué profesionales y servicios se pueden reservar en línea.",
            pt: "Escolha quais profissionais e serviços podem ser reservados online.",
            en: "Choose which professionals and services can be booked online.",
          },
          {
            es: "Copia el enlace y compártelo donde están tus pacientes.",
            pt: "Copie o link e compartilhe onde estão seus pacientes.",
            en: "Copy the link and share it where your patients are.",
          },
        ],
      },
      {
        type: "callout",
        tone: "success",
        title: { es: "Tus bloqueos se respetan", pt: "Seus bloqueios são respeitados", en: "Your blocks are respected" },
        text: {
          es: "La agenda pública nunca ofrece un horario bloqueado ni superpone citas: lee tu disponibilidad real en tiempo real.",
          pt: "A agenda pública nunca oferece um horário bloqueado nem sobrepõe consultas: lê sua disponibilidade real em tempo real.",
          en: "The public agenda never offers a blocked slot or overlaps appointments: it reads your real availability in real time.",
        },
      },
    ],
  },

  // ────────────────────────────── FINANZAS ──────────────────────────────
  {
    slug: "abrir-y-cerrar-caja",
    categoryId: "finanzas",
    updated: "2026-06-15",
    readingMinutes: 5,
    featured: true,
    keywords: ["caja", "caixa", "cierre", "arqueo", "efectivo", "cobros", "cobranças"],
    related: ["activar-boleta-sii-chile"],
    title: {
      es: "Abrir y cerrar caja: el flujo diario",
      pt: "Abrir e fechar o caixa: o fluxo diário",
      en: "Opening and closing the cash drawer: the daily flow",
    },
    excerpt: {
      es: "Cómo funciona la caja por usuario, el cierre del día y el arqueo sin sorpresas.",
      pt: "Como funciona o caixa por usuário, o fechamento do dia e a conferência sem surpresas.",
      en: "How the per-user cash drawer works, the daily close and reconciliation without surprises.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Cada usuario tiene su propia caja. Se abre al empezar el día y se cierra al terminar, dejando un registro claro de todo lo cobrado.",
          pt: "Cada usuário tem seu próprio caixa. Abre ao começar o dia e fecha ao terminar, deixando um registro claro de tudo o que foi cobrado.",
          en: "Each user has their own drawer. It opens at the start of the day and closes at the end, leaving a clear record of everything collected.",
        },
      },
      {
        type: "illustration",
        illustration: "pantalla-caja",
        caption: {
          es: "El cierre compara lo esperado con lo contado y muestra la diferencia.",
          pt: "O fechamento compara o esperado com o contado e mostra a diferença.",
          en: "The close compares expected vs. counted and shows the difference.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Al primer cobro del día, la caja se abre automáticamente a tu nombre.",
            pt: "No primeiro recebimento do dia, o caixa abre automaticamente no seu nome.",
            en: "On the first payment of the day, the drawer opens automatically under your name.",
          },
          {
            es: "Registra los cobros normalmente; cada uno queda ligado a tu caja.",
            pt: "Registre os recebimentos normalmente; cada um fica ligado ao seu caixa.",
            en: "Record payments as usual; each one is tied to your drawer.",
          },
          {
            es: "Al final del día, pulsa «Cerrar caja» y cuenta el efectivo.",
            pt: "No fim do dia, clique em «Fechar caixa» e conte o dinheiro.",
            en: "At the end of the day, click “Close drawer” and count the cash.",
          },
          {
            es: "Revisa la diferencia entre lo esperado y lo contado, y confirma.",
            pt: "Revise a diferença entre o esperado e o contado, e confirme.",
            en: "Review the difference between expected and counted, and confirm.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Si olvidas cerrar la caja, se cierra sola a medianoche para no arrastrar movimientos al día siguiente.",
          pt: "Se você esquecer de fechar o caixa, ele fecha sozinho à meia-noite para não arrastar movimentos ao dia seguinte.",
          en: "If you forget to close the drawer, it closes itself at midnight so movements don't carry into the next day.",
        },
      },
    ],
  },

  // ──────────────────────────────── FISCAL ───────────────────────────────
  {
    slug: "activar-boleta-sii-chile",
    categoryId: "fiscal",
    updated: "2026-06-10",
    readingMinutes: 7,
    featured: true,
    keywords: ["sii", "chile", "boleta", "dte", "documento tributario", "factura electronica", "impuestos"],
    related: ["abrir-y-cerrar-caja"],
    title: {
      es: "Activar la boleta electrónica del SII (Chile)",
      pt: "Ativar a boleta eletrônica do SII (Chile)",
      en: "Enable SII electronic receipts (Chile)",
    },
    excerpt: {
      es: "Conecta SuperClini con el SII y emite boletas electrónicas directo desde cada cobro.",
      pt: "Conecte o SuperClini ao SII e emita boletas eletrônicas direto de cada cobrança.",
      en: "Connect SuperClini to the SII and issue electronic receipts straight from each payment.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Si atiendes en Chile, puedes emitir boletas electrónicas del SII sin salir de SuperClini. La configuración es de una sola vez.",
          pt: "Se você atende no Chile, pode emitir boletas eletrônicas do SII sem sair do SuperClini. A configuração é feita uma única vez.",
          en: "If you operate in Chile, you can issue SII electronic receipts without leaving SuperClini. It's a one-time setup.",
        },
      },
      {
        type: "h2",
        text: { es: "Lo que necesitas", pt: "O que você precisa", en: "What you need" },
      },
      {
        type: "list",
        items: [
          {
            es: "Tu certificado digital vigente (.pfx) y su clave.",
            pt: "Seu certificado digital vigente (.pfx) e a senha dele.",
            en: "Your valid digital certificate (.pfx) and its password.",
          },
          {
            es: "Estar habilitado como emisor de documentos electrónicos en el SII.",
            pt: "Estar habilitado como emissor de documentos eletrônicos no SII.",
            en: "Being enabled as an electronic document issuer at the SII.",
          },
        ],
      },
      {
        type: "steps",
        items: [
          {
            es: "Entra en Ajustes → Facturación → Chile (SII).",
            pt: "Entre em Ajustes → Faturamento → Chile (SII).",
            en: "Go to Settings → Invoicing → Chile (SII).",
          },
          {
            es: "Sube tu certificado .pfx e ingresa la clave.",
            pt: "Envie seu certificado .pfx e digite a senha.",
            en: "Upload your .pfx certificate and enter the password.",
          },
          {
            es: "Carga el folio (CAF) de boletas descargado del SII.",
            pt: "Carregue o folio (CAF) de boletas baixado do SII.",
            en: "Load the receipt folio (CAF) downloaded from the SII.",
          },
          {
            es: "Emite una boleta de prueba y verifica que el SII la acepte.",
            pt: "Emita uma boleta de teste e verifique que o SII a aceite.",
            en: "Issue a test receipt and check the SII accepts it.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: { es: "Cuida los folios (CAF)", pt: "Cuide dos folios (CAF)", en: "Mind your folios (CAF)" },
        text: {
          es: "Los folios se agotan. SuperClini te avisa cuando quedan pocos para que cargues nuevos antes de quedarte sin emitir.",
          pt: "Os folios se esgotam. O SuperClini avisa quando restam poucos para você carregar novos antes de ficar sem emitir.",
          en: "Folios run out. SuperClini warns you when few remain so you load new ones before you can't issue.",
        },
      },
    ],
  },

  // ──────────────────────────────── CUENTA ───────────────────────────────
  {
    slug: "usuarios-y-permisos",
    categoryId: "cuenta",
    updated: "2026-06-12",
    readingMinutes: 5,
    keywords: ["usuarios", "permisos", "roles", "rbac", "equipo", "acceso", "seguridad"],
    related: ["configurar-tu-clinica"],
    title: {
      es: "Usuarios y permisos: dar acceso a tu equipo",
      pt: "Usuários e permissões: dar acesso à sua equipe",
      en: "Users and permissions: giving your team access",
    },
    excerpt: {
      es: "Invita al equipo y define qué puede ver y hacer cada persona según su rol.",
      pt: "Convide a equipe e defina o que cada pessoa pode ver e fazer conforme o papel.",
      en: "Invite the team and define what each person can see and do based on their role.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "No todos necesitan ver todo. Los permisos por rol protegen la información sensible y simplifican el día a día de cada persona.",
          pt: "Nem todos precisam ver tudo. As permissões por papel protegem a informação sensível e simplificam o dia a dia de cada pessoa.",
          en: "Not everyone needs to see everything. Role-based permissions protect sensitive data and simplify each person's day.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Ve a Ajustes → Usuarios y pulsa «Invitar».",
            pt: "Vá em Ajustes → Usuários e clique em «Convidar».",
            en: "Go to Settings → Users and click “Invite”.",
          },
          {
            es: "Ingresa el correo y elige un rol (recepción, profesional, administrador…).",
            pt: "Digite o e-mail e escolha um papel (recepção, profissional, administrador…).",
            en: "Enter the email and pick a role (front desk, professional, administrator…).",
          },
          {
            es: "Ajusta permisos finos si necesitas algo distinto al rol base.",
            pt: "Ajuste permissões finas se precisar de algo diferente do papel base.",
            en: "Fine-tune permissions if you need something beyond the base role.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Cada acción importante queda registrada con autor y fecha, para que siempre sepas quién hizo qué.",
          pt: "Cada ação importante fica registrada com autor e data, para você sempre saber quem fez o quê.",
          en: "Every important action is logged with author and date, so you always know who did what.",
        },
      },
    ],
  },

  // ─────────────────────────────── CLÍNICO ───────────────────────────────
  {
    slug: "registrar-en-odontograma",
    categoryId: "clinico",
    updated: "2026-06-08",
    readingMinutes: 6,
    keywords: ["odontograma", "ficha", "dientes", "dentes", "piezas", "tratamiento", "hallazgos"],
    related: ["configurar-tu-clinica"],
    title: {
      es: "Registrar hallazgos en el odontograma",
      pt: "Registrar achados no odontograma",
      en: "Recording findings on the odontogram",
    },
    excerpt: {
      es: "Marca caries, restauraciones y tratamientos pieza por pieza, con historial por diente.",
      pt: "Marque cáries, restaurações e tratamentos dente por dente, com histórico por dente.",
      en: "Mark caries, restorations and treatments tooth by tooth, with per-tooth history.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El odontograma es el corazón de la ficha clínica: refleja el estado de cada pieza y guarda el historial de todo lo que hiciste.",
          pt: "O odontograma é o coração da ficha clínica: reflete o estado de cada dente e guarda o histórico de tudo o que você fez.",
          en: "The odontogram is the heart of the clinical chart: it reflects the state of each tooth and keeps the history of everything you did.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Abre la ficha del paciente y entra en la pestaña Odontograma.",
            pt: "Abra a ficha do paciente e entre na aba Odontograma.",
            en: "Open the patient's chart and go to the Odontogram tab.",
          },
          {
            es: "Selecciona la pieza y elige el hallazgo o tratamiento.",
            pt: "Selecione o dente e escolha o achado ou tratamento.",
            en: "Select the tooth and choose the finding or treatment.",
          },
          {
            es: "Indica si es un estado actual o un tratamiento a realizar.",
            pt: "Indique se é um estado atual ou um tratamento a realizar.",
            en: "Indicate whether it's a current state or a treatment to be done.",
          },
          {
            es: "Guarda: el cambio queda con fecha y autor en el historial.",
            pt: "Salve: a alteração fica com data e autor no histórico.",
            en: "Save: the change is stored with date and author in the history.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Los tratamientos a realizar se conectan con el presupuesto y el cobro, sin recargar la información dos veces.",
          pt: "Os tratamentos a realizar se conectam ao orçamento e à cobrança, sem recarregar a informação duas vezes.",
          en: "Planned treatments connect to the quote and the payment, without entering the information twice.",
        },
      },
    ],
  },

  // ──────────────────────────────── TÓTEM ────────────────────────────────
  {
    slug: "check-in-por-documento",
    categoryId: "totem",
    updated: "2026-06-14",
    readingMinutes: 4,
    keywords: ["totem", "tótem", "check-in", "recepcion", "recepção", "documento", "rut", "autoatencion"],
    related: ["activar-agenda-publica"],
    title: {
      es: "Check-in por documento en el tótem",
      pt: "Check-in por documento no totem",
      en: "Document check-in at the kiosk",
    },
    excerpt: {
      es: "El paciente confirma su llegada solo, ingresando su documento en la pantalla de recepción.",
      pt: "O paciente confirma sua chegada sozinho, informando o documento na tela de recepção.",
      en: "Patients confirm arrival on their own by entering their document on the front-desk screen.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El tótem descongestiona la recepción: el paciente llega, ingresa su documento y su cita queda confirmada sin pasar por el mostrador.",
          pt: "O totem desafoga a recepção: o paciente chega, informa o documento e sua consulta fica confirmada sem passar pelo balcão.",
          en: "The kiosk unclogs the front desk: the patient arrives, enters their document and their appointment is confirmed without stopping at the counter.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Abre SuperClini en modo tótem en la pantalla de recepción.",
            pt: "Abra o SuperClini em modo totem na tela de recepção.",
            en: "Open SuperClini in kiosk mode on the front-desk screen.",
          },
          {
            es: "El paciente ingresa su documento (RUT, DNI o el de tu país).",
            pt: "O paciente informa o documento (CPF, RUT ou o do seu país).",
            en: "The patient enters their document (national ID for your country).",
          },
          {
            es: "El sistema encuentra su cita del día y la marca como «llegó».",
            pt: "O sistema encontra a consulta do dia e a marca como «chegou».",
            en: "The system finds their appointment for the day and marks it “arrived”.",
          },
        ],
      },
      {
        type: "callout",
        tone: "success",
        text: {
          es: "La agenda del profesional se actualiza al instante, para que sepa quién ya está en la sala de espera.",
          pt: "A agenda do profissional se atualiza na hora, para saber quem já está na sala de espera.",
          en: "The professional's agenda updates instantly, so they know who's already in the waiting room.",
        },
      },
    ],
  },
] as const;
