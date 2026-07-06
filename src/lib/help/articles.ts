import type { Article } from "./types";

/**
 * Conteúdo do Centro de Ayuda — ALTA FIDELIDADE, aterrado no estado real da
 * plataforma (specs + ~2.434 testes + código, análise jul/2026). Cada artigo é
 * um objeto tipado; o corpo é um Block[] renderizado por ArticleBody.
 *
 * Ola 1 (núcleo, reescrito com fonte): Sofía · Agenda · Ficha clínica · Caja.
 * Demais coleções: 1 artigo fiel cada (ampliação na Ola 2).
 * Regra: NUNCA descrever função inexistente (ver plano de conteúdo).
 */
export const HELP_ARTICLES: readonly Article[] = [
  // ═══════════════════════════ PRIMEROS PASOS ═══════════════════════════
  {
    slug: "migrar-desde-dentalink",
    categoryId: "primeros-pasos",
    updated: "2026-07-01",
    readingMinutes: 6,
    keywords: ["dentalink", "migracion", "migração", "importar", "traspaso", "datos"],
    related: ["configurar-tu-clinica"],
    title: {
      es: "¿Vienes de Dentalink? Así migramos tus datos",
      pt: "Vem do Dentalink? Assim migramos seus dados",
      en: "Coming from Dentalink? How we migrate your data",
    },
    excerpt: {
      es: "El equipo de SuperClini traspasa tus pacientes, fichas y agenda desde Dentalink. Tú solo revisas.",
      pt: "A equipe da SuperClini transfere seus pacientes, fichas e agenda do Dentalink. Você só revisa.",
      en: "The SuperClini team moves your patients, charts and schedule from Dentalink. You just review.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "La migración desde Dentalink la realiza el equipo de SuperClini por ti: no es algo que configures sola. Nosotros procesamos tus datos exportados y creamos tu clínica ya lista para trabajar.",
          pt: "A migração do Dentalink é feita pela equipe da SuperClini para você: não é algo que você configura sozinha. Nós processamos seus dados exportados e criamos sua clínica já pronta para trabalhar.",
          en: "The migration from Dentalink is done by the SuperClini team for you — it isn't something you set up yourself. We process your exported data and create your clinic ready to work.",
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
        text: { es: "Qué se migra", pt: "O que é migrado", en: "What gets migrated" },
      },
      {
        type: "list",
        items: [
          {
            es: "Pacientes, fichas clínicas, odontograma, agenda, planes y cuentas por cobrar.",
            pt: "Pacientes, fichas clínicas, odontograma, agenda, planos e contas a receber.",
            en: "Patients, clinical charts, odontogram, schedule, plans and receivables.",
          },
          {
            es: "Antecedentes médicos (alergias, medicamentos) que Dentalink no exporta en bloque, cuando es posible recuperarlos.",
            pt: "Antecedentes médicos (alergias, medicamentos) que o Dentalink não exporta em bloco, quando é possível recuperá-los.",
            en: "Medical history (allergies, medications) that Dentalink doesn't bulk-export, when it can be recovered.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: { es: "Todavía no migran las imágenes", pt: "Ainda não migram as imagens", en: "Images don't migrate yet" },
        text: {
          es: "Radiografías, DICOM y archivos de examen aún no se traspasan automáticamente. Se cargan después, dentro de SuperClini.",
          pt: "Radiografias, DICOM e arquivos de exame ainda não são transferidos automaticamente. São carregados depois, dentro do SuperClini.",
          en: "Radiographs, DICOM and exam files aren't transferred automatically yet. They're uploaded afterwards, inside SuperClini.",
        },
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Hoy migramos desde Dentalink (Chile), una sucursal por vez. Tras la migración, el administrador entra con una contraseña provisional y la cambia en el primer acceso.",
          pt: "Hoje migramos do Dentalink (Chile), uma filial por vez. Após a migração, o administrador entra com uma senha provisória e a troca no primeiro acesso.",
          en: "Today we migrate from Dentalink (Chile), one branch at a time. After migration, the admin signs in with a temporary password and changes it on first login.",
        },
      },
    ],
  },
  {
    slug: "configurar-tu-clinica",
    categoryId: "primeros-pasos",
    updated: "2026-06-20",
    readingMinutes: 5,
    keywords: ["configuracion", "clinica", "horario", "zona horaria", "logo", "region"],
    related: ["migrar-desde-dentalink", "usuarios-y-roles"],
    title: {
      es: "Configurar tu clínica: datos, horario y zona horaria",
      pt: "Configurar sua clínica: dados, horário e fuso",
      en: "Set up your clinic: details, hours and time zone",
    },
    excerpt: {
      es: "Todo lo esencial vive en Configuraciones, organizado en pestañas. Empieza por aquí.",
      pt: "Tudo o essencial vive em Configurações, organizado em abas. Comece por aqui.",
      en: "Everything essential lives in Settings, organized in tabs. Start here.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "En el menú Configuraciones encuentras todo lo de tu clínica, repartido en pestañas. Estas son las que usarás al empezar.",
          pt: "No menu Configurações você encontra tudo da sua clínica, dividido em abas. Estas são as que você usará ao começar.",
          en: "In the Settings menu you'll find everything about your clinic, split into tabs. These are the ones you'll use to start.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Clínica: carga tu logo y completa nombre, dirección, teléfono y datos de contacto.",
            pt: "Clínica: envie seu logo e preencha nome, endereço, telefone e dados de contato.",
            en: "Clinic: upload your logo and fill in name, address, phone and contact details.",
          },
          {
            es: "Agenda: define el horario de apertura y cierre, los días laborales y la duración de la consulta.",
            pt: "Agenda: defina o horário de abertura e fechamento, os dias úteis e a duração da consulta.",
            en: "Agenda: set opening and closing hours, working days and the appointment duration.",
          },
          {
            es: "Región: revisa país, moneda y zona horaria. Agrega a tus profesionales desde Administración.",
            pt: "Região: revise país, moeda e fuso. Adicione seus profissionais em Administração.",
            en: "Region: check country, currency and time zone. Add your professionals from Administration.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: { es: "País y moneda los define la plataforma", pt: "País e moeda são definidos pela plataforma", en: "Country and currency are set by the platform" },
        text: {
          es: "En la pestaña Región, el país, la moneda y el idioma son de solo lectura. La zona horaria solo se puede cambiar en países con más de un huso (como Brasil o Chile).",
          pt: "Na aba Região, o país, a moeda e o idioma são somente leitura. O fuso só pode ser alterado em países com mais de um fuso (como Brasil ou Chile).",
          en: "In the Region tab, country, currency and language are read-only. The time zone can only be changed in countries with more than one zone (like Brazil or Chile).",
        },
      },
    ],
  },

  // ══════════════════════════════ AGENDA ══════════════════════════════
  {
    slug: "agendar-una-cita",
    categoryId: "agenda",
    updated: "2026-06-25",
    readingMinutes: 5,
    featured: true,
    keywords: ["agenda", "cita", "consulta", "agendar", "vista", "lista", "dia", "semana"],
    related: ["mover-una-cita", "estados-y-check-in", "activar-agenda-publica"],
    title: {
      es: "Agendar una cita y las vistas de agenda",
      pt: "Agendar uma consulta e as vistas da agenda",
      en: "Book an appointment and the agenda views",
    },
    excerpt: {
      es: "Crea citas en segundos y alterna entre las vistas Lista, Día y Semana.",
      pt: "Crie consultas em segundos e alterne entre as vistas Lista, Dia e Semana.",
      en: "Create appointments in seconds and switch between List, Day and Week views.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "La agenda vive en el menú Agenda. Tiene tres vistas que cambias en la parte superior: Lista, Día y Semana. Navegas con Anterior, Hoy y Siguiente.",
          pt: "A agenda vive no menu Agenda. Tem três vistas que você troca no topo: Lista, Dia e Semana. Você navega com Anterior, Hoje e Seguinte.",
          en: "The agenda lives in the Agenda menu. It has three views you switch at the top: List, Day and Week. Navigate with Previous, Today and Next.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Pulsa el botón + o haz clic en un espacio libre del calendario.",
            pt: "Clique no botão + ou clique em um espaço livre do calendário.",
            en: "Click the + button or click an empty slot in the calendar.",
          },
          {
            es: "Elige el paciente y el profesional, y ajusta la hora de inicio y fin.",
            pt: "Escolha o paciente e o profissional, e ajuste a hora de início e fim.",
            en: "Choose the patient and professional, and set the start and end time.",
          },
          {
            es: "Guarda. La cita aparece en la agenda con el color del profesional.",
            pt: "Salve. A consulta aparece na agenda com a cor do profissional.",
            en: "Save. The appointment shows on the agenda in the professional's color.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Si el paciente tiene deuda o su registro está incompleto, la cita muestra un aviso para que lo resuelvas antes de la atención.",
          pt: "Se o paciente tem débito ou o cadastro está incompleto, a consulta mostra um aviso para você resolver antes do atendimento.",
          en: "If the patient has debt or an incomplete record, the appointment shows a warning so you can fix it before the visit.",
        },
      },
    ],
  },
  {
    slug: "mover-una-cita",
    categoryId: "agenda",
    updated: "2026-06-25",
    readingMinutes: 3,
    keywords: ["mover", "arrastrar", "drag", "duracion", "reprogramar", "granularidad"],
    related: ["agendar-una-cita"],
    title: {
      es: "Mover una cita y cambiar su duración",
      pt: "Mover uma consulta e mudar a duração",
      en: "Move an appointment and change its duration",
    },
    excerpt: {
      es: "Arrastra para reprogramar y estira el borde para cambiar la duración.",
      pt: "Arraste para reprogramar e estique a borda para mudar a duração.",
      en: "Drag to reschedule and stretch the edge to change the duration.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "En las vistas Día y Semana puedes reorganizar la agenda directamente con el mouse o el dedo.",
          pt: "Nas vistas Dia e Semana você reorganiza a agenda direto com o mouse ou o dedo.",
          en: "In Day and Week views you can rearrange the agenda directly with the mouse or your finger.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Arrastra la cita a otro horario: se actualiza al instante y avisa si algo falla.",
            pt: "Arraste a consulta para outro horário: atualiza na hora e avisa se algo falhar.",
            en: "Drag the appointment to another time: it updates instantly and warns you if something fails.",
          },
          {
            es: "Estira el borde inferior para alargar o acortar la duración.",
            pt: "Estique a borda inferior para alongar ou encurtar a duração.",
            en: "Stretch the bottom edge to lengthen or shorten the duration.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "La rejilla se ajusta a bloques de 15 minutos y el arrastre se acomoda a la duración de consulta que configuraste en tu clínica.",
          pt: "A grade trabalha em blocos de 15 minutos e o arrasto se acomoda à duração de consulta configurada na sua clínica.",
          en: "The grid works in 15-minute blocks and dragging snaps to the appointment duration you configured for your clinic.",
        },
      },
    ],
  },
  {
    slug: "estados-y-check-in",
    categoryId: "agenda",
    updated: "2026-06-04",
    readingMinutes: 4,
    keywords: ["estado", "confirmado", "realizado", "falto", "check-in", "atencion", "iniciar"],
    related: ["agendar-una-cita"],
    title: {
      es: "Estados de la cita e inicio de atención",
      pt: "Estados da consulta e início do atendimento",
      en: "Appointment states and starting the visit",
    },
    excerpt: {
      es: "De agendado a realizado: cómo avanza una cita y cómo marcas el check-in.",
      pt: "De agendado a realizado: como uma consulta avança e como marcar o check-in.",
      en: "From booked to done: how an appointment progresses and how you mark check-in.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Cada cita tiene un estado que refleja en qué punto está la atención. Los cambias desde la propia cita.",
          pt: "Cada consulta tem um estado que reflete em que ponto está o atendimento. Você os muda na própria consulta.",
          en: "Each appointment has a state that reflects where the visit stands. You change it from the appointment itself.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Estados: agendado, confirmado, realizado, cancelado y no asistió (faltó). Tu clínica puede tener estados propios.",
            pt: "Estados: agendado, confirmado, realizado, cancelado e não compareceu (faltou). Sua clínica pode ter estados próprios.",
            en: "States: booked, confirmed, done, cancelled and no-show. Your clinic can have custom states.",
          },
          {
            es: "Al iniciar la atención, la cita pasa a confirmado y entra en curso; al finalizar, queda como realizado.",
            pt: "Ao iniciar o atendimento, a consulta vira confirmado e entra em curso; ao finalizar, fica como realizado.",
            en: "When you start the visit, the appointment turns confirmed and goes in progress; when you finish, it becomes done.",
          },
        ],
      },
    ],
  },
  {
    slug: "bloquear-horarios",
    categoryId: "agenda",
    updated: "2026-06-04",
    readingMinutes: 3,
    keywords: ["bloqueo", "bloquear", "vacaciones", "almuerzo", "ausencia", "candado"],
    related: ["agendar-una-cita", "activar-agenda-publica"],
    title: {
      es: "Bloquear horarios en la agenda",
      pt: "Bloquear horários na agenda",
      en: "Block times on the agenda",
    },
    excerpt: {
      es: "Vacaciones, almuerzo o ausencias: reserva franjas para que nadie agende encima.",
      pt: "Férias, almoço ou ausências: reserve faixas para ninguém agendar por cima.",
      en: "Holidays, lunch or absences: reserve slots so no one books over them.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Los bloqueos marcan una franja como no disponible. Se crean desde la propia agenda con el botón Bloquear (el candado).",
          pt: "Os bloqueios marcam uma faixa como indisponível. São criados na própria agenda com o botão Bloquear (o cadeado).",
          en: "Blocks mark a slot as unavailable. You create them from the agenda with the Block button (the padlock).",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Pulsa Bloquear y elige el profesional, el inicio, el fin y el motivo (ej.: almuerzo, vacaciones).",
            pt: "Clique em Bloquear e escolha o profissional, o início, o fim e o motivo (ex.: almoço, férias).",
            en: "Click Block and choose the professional, start, end and reason (e.g. lunch, holidays).",
          },
          {
            es: "Guarda. Ese horario queda cerrado para nuevas citas.",
            pt: "Salve. Esse horário fica fechado para novas consultas.",
            en: "Save. That time is now closed to new appointments.",
          },
        ],
      },
      {
        type: "callout",
        tone: "success",
        text: {
          es: "Los bloqueos se respetan en todo: al agendar manualmente aparece un aviso, y la agenda pública nunca ofrece un horario bloqueado.",
          pt: "Os bloqueios são respeitados em tudo: ao agendar manualmente aparece um aviso, e a agenda pública nunca oferece um horário bloqueado.",
          en: "Blocks are respected everywhere: booking manually shows a warning, and the public agenda never offers a blocked slot.",
        },
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Un profesional bloquea solo su propia agenda; un administrador puede bloquear la de cualquiera.",
          pt: "Um profissional bloqueia só a própria agenda; um administrador pode bloquear a de qualquer um.",
          en: "A professional blocks only their own agenda; an administrator can block anyone's.",
        },
      },
    ],
  },
  {
    slug: "recordatorios-de-citas",
    categoryId: "agenda",
    updated: "2026-06-01",
    readingMinutes: 3,
    keywords: ["recordatorio", "aviso", "email", "correo", "notificacion", "confirmacion"],
    related: ["agendar-una-cita"],
    title: {
      es: "Recordatorios y confirmaciones de cita",
      pt: "Lembretes e confirmações de consulta",
      en: "Appointment reminders and confirmations",
    },
    excerpt: {
      es: "Qué aviso sale por email, qué sale por WhatsApp y cuándo.",
      pt: "Qual aviso sai por email, qual sai por WhatsApp e quando.",
      en: "Which notice goes by email, which goes by WhatsApp, and when.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Los avisos se configuran en Configuraciones, sección Notificaciones. Hay dos momentos distintos: la confirmación al agendar y el recordatorio del día anterior.",
          pt: "Os avisos são configurados em Configurações, seção Notificações. Há dois momentos distintos: a confirmação ao agendar e o lembrete do dia anterior.",
          en: "Notices are set in Settings, Notifications section. There are two distinct moments: the confirmation at booking and the day-before reminder.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Recordatorio automático del día anterior: se envía por e-mail (si el paciente tiene correo).",
            pt: "Lembrete automático do dia anterior: enviado por e-mail (se o paciente tiver e-mail).",
            en: "Automatic day-before reminder: sent by e-mail (if the patient has an email).",
          },
          {
            es: "Confirmación al agendar: puede salir por e-mail y, opcionalmente, por WhatsApp.",
            pt: "Confirmação ao agendar: pode sair por e-mail e, opcionalmente, por WhatsApp.",
            en: "Confirmation at booking: can go by e-mail and, optionally, by WhatsApp.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El recordatorio recurrente es del día anterior por correo. Para conversación y agendamiento por WhatsApp 24/7, esa es la función de Sofía.",
          pt: "O lembrete recorrente é do dia anterior por e-mail. Para conversa e agendamento por WhatsApp 24/7, essa é a função da Sofía.",
          en: "The recurring reminder is day-before by email. For 24/7 WhatsApp conversation and booking, that's Sofía's job.",
        },
      },
    ],
  },
  {
    slug: "activar-agenda-publica",
    categoryId: "agenda",
    updated: "2026-06-25",
    readingMinutes: 5,
    featured: true,
    keywords: ["agenda publica", "reservas online", "link", "horizonte", "reserva", "online"],
    related: ["agendar-una-cita", "que-hace-sofia"],
    title: {
      es: "Activar la agenda pública (reservas online)",
      pt: "Ativar a agenda pública (reservas online)",
      en: "Turn on the public agenda (online booking)",
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
          es: "La agenda pública se activa en Configuraciones, en la pestaña de agendamiento Online. Es un interruptor maestro: mientras esté apagado, los enlaces no funcionan.",
          pt: "A agenda pública é ativada em Configurações, na aba de agendamento Online. É um interruptor mestre: enquanto estiver desligado, os links não funcionam.",
          en: "The public agenda is enabled in Settings, in the Online booking tab. It's a master switch: while it's off, the links don't work.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Activa el agendamiento online y define el horizonte de reserva (cuántos días hacia adelante, de 1 a 365; por defecto 60).",
            pt: "Ative o agendamento online e defina o horizonte de reserva (quantos dias à frente, de 1 a 365; padrão 60).",
            en: "Turn on online booking and set the booking horizon (how many days ahead, from 1 to 365; default 60).",
          },
          {
            es: "Crea el link general de la clínica (solo administradores) y compártelo en tus redes o web.",
            pt: "Crie o link geral da clínica (só administradores) e compartilhe nas suas redes ou site.",
            en: "Create the clinic's general link (admins only) and share it on your social media or website.",
          },
          {
            es: "Para un paciente puntual, genera un link personal desde su ficha: caduca en 7 días y es de un solo uso.",
            pt: "Para um paciente específico, gere um link pessoal na ficha dele: expira em 7 dias e é de uso único.",
            en: "For a specific patient, generate a personal link from their chart: it expires in 7 days and is single-use.",
          },
        ],
      },
      {
        type: "callout",
        tone: "success",
        title: { es: "Tus bloqueos se respetan", pt: "Seus bloqueios são respeitados", en: "Your blocks are respected" },
        text: {
          es: "La agenda pública nunca ofrece un horario bloqueado ni superpone citas, y lee tu disponibilidad en tu zona horaria. Un paciente con una cita futura no puede reservar otra por error.",
          pt: "A agenda pública nunca oferece um horário bloqueado nem sobrepõe consultas, e lê sua disponibilidade no seu fuso. Um paciente com consulta futura não pode reservar outra por engano.",
          en: "The public agenda never offers a blocked slot or overlaps appointments, and reads your availability in your time zone. A patient with a future appointment can't accidentally book another.",
        },
      },
    ],
  },

  // ══════════════════════════════ SOFÍA ══════════════════════════════
  {
    slug: "conectar-whatsapp",
    categoryId: "sofia",
    updated: "2026-07-01",
    readingMinutes: 5,
    keywords: ["whatsapp", "conectar", "qr", "codigo", "vincular", "numero", "evolution"],
    related: ["que-hace-sofia", "asumir-conversacion"],
    title: {
      es: "Conectar el WhatsApp de tu clínica (código QR)",
      pt: "Conectar o WhatsApp da sua clínica (código QR)",
      en: "Connect your clinic's WhatsApp (QR code)",
    },
    excerpt: {
      es: "Vincula tu número escaneando un QR, igual que WhatsApp Web. Todo desde el menú WhatsApp.",
      pt: "Vincule seu número escaneando um QR, igual ao WhatsApp Web. Tudo no menu WhatsApp.",
      en: "Link your number by scanning a QR, just like WhatsApp Web. All from the WhatsApp menu.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Todo lo de Sofía vive en el menú WhatsApp. Lo primero es vincular el número de la clínica escaneando un código QR (el mismo mecanismo de WhatsApp Web).",
          pt: "Tudo da Sofía vive no menu WhatsApp. O primeiro passo é vincular o número da clínica escaneando um código QR (o mesmo mecanismo do WhatsApp Web).",
          en: "Everything about Sofía lives in the WhatsApp menu. The first step is to link the clinic's number by scanning a QR code (the same mechanism as WhatsApp Web).",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "En el menú WhatsApp, pulsa «Configurar WhatsApp». Aparecerá un código QR.",
            pt: "No menu WhatsApp, clique em «Configurar WhatsApp». Aparecerá um código QR.",
            en: "In the WhatsApp menu, click “Set up WhatsApp”. A QR code will appear.",
          },
          {
            es: "En el celular de la clínica, abre WhatsApp → Dispositivos vinculados → Vincular un dispositivo, y escanea.",
            pt: "No celular da clínica, abra WhatsApp → Aparelhos conectados → Conectar um aparelho, e escaneie.",
            en: "On the clinic's phone, open WhatsApp → Linked devices → Link a device, and scan.",
          },
          {
            es: "Espera el estado «Conectado» en verde con tu número. Listo.",
            pt: "Aguarde o status «Conectado» em verde com seu número. Pronto.",
            en: "Wait for the green “Connected” status with your number. Done.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: { es: "El QR caduca en 90 segundos", pt: "O QR expira em 90 segundos", en: "The QR expires in 90 seconds" },
        text: {
          es: "Si no alcanzas a escanearlo, pulsa Regenerar y aparecerá uno nuevo. Escanéalo con calma dentro de ese tiempo.",
          pt: "Se você não conseguir escanear, clique em Regenerar e aparecerá um novo. Escaneie com calma dentro desse tempo.",
          en: "If you don't scan it in time, click Regenerate for a new one. Scan it calmly within that window.",
        },
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Desconectar mantiene la configuración y el historial. «Quitar y recrear» borra la sesión y el historial de mensajes: úsalo solo si el número quedó en mal estado.",
          pt: "Desconectar mantém a configuração e o histórico. «Remover e recriar» apaga a sessão e o histórico de mensagens: use só se o número ficou travado.",
          en: "Disconnect keeps your settings and history. “Remove and recreate” wipes the session and message history: use it only if the number is stuck.",
        },
      },
    ],
  },
  {
    slug: "que-hace-sofia",
    categoryId: "sofia",
    updated: "2026-07-01",
    readingMinutes: 5,
    featured: true,
    keywords: ["sofia", "ia", "agente", "agenda", "responde", "que hace", "capacidades"],
    related: ["conectar-whatsapp", "personalizar-sofia", "asumir-conversacion"],
    title: {
      es: "Qué hace Sofía por ti",
      pt: "O que a Sofía faz por você",
      en: "What Sofía does for you",
    },
    excerpt: {
      es: "Tu asistente de IA atiende WhatsApp, agenda, registra pacientes y responde dudas frecuentes.",
      pt: "Seu assistente de IA atende o WhatsApp, agenda, cadastra pacientes e responde dúvidas frequentes.",
      en: "Your AI assistant answers WhatsApp, books, registers patients and handles FAQs.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Sofía es una recepcionista virtual con IA que atiende tu WhatsApp las 24 horas. Reconoce al paciente por su número y actúa sobre datos reales de tu clínica.",
          pt: "Sofía é uma recepcionista virtual com IA que atende seu WhatsApp 24 horas. Reconhece o paciente pelo número e age sobre dados reais da sua clínica.",
          en: "Sofía is an AI virtual receptionist that answers your WhatsApp around the clock. She recognizes the patient by their number and acts on your clinic's real data.",
        },
      },
      {
        type: "illustration",
        illustration: "flujo-sofia",
        caption: {
          es: "El paciente escribe, Sofía responde y agenda, tu equipo confirma.",
          pt: "O paciente escreve, Sofía responde e agenda, sua equipe confirma.",
          en: "The patient writes, Sofía replies and books, your team confirms.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Agenda de verdad: consulta horarios disponibles, crea, cancela, reagenda y confirma citas.",
            pt: "Agenda de verdade: consulta horários disponíveis, cria, cancela, reagenda e confirma consultas.",
            en: "Really books: checks available slots, creates, cancels, reschedules and confirms appointments.",
          },
          {
            es: "Registra pacientes nuevos y los busca por nombre o documento (RUT/CPF/DNI).",
            pt: "Cadastra pacientes novos e os busca por nome ou documento (RUT/CPF/DNI).",
            en: "Registers new patients and finds them by name or document (RUT/CPF/DNI).",
          },
          {
            es: "Responde precios de procedimientos, dirección, horario y datos de la clínica.",
            pt: "Responde preços de procedimentos, endereço, horário e dados da clínica.",
            en: "Answers procedure prices, address, hours and clinic details.",
          },
          {
            es: "Transfiere a una persona del equipo cuando hace falta.",
            pt: "Transfere para uma pessoa da equipe quando é preciso.",
            en: "Hands off to a team member when needed.",
          },
        ],
      },
      {
        type: "callout",
        tone: "success",
        title: { es: "Tú decides, siempre", pt: "Você decide, sempre", en: "You decide, always" },
        text: {
          es: "Sofía nunca da diagnósticos ni inventa horarios, y por privacidad nunca dice si un profesional está o no en la clínica.",
          pt: "Sofía nunca dá diagnósticos nem inventa horários, e por privacidade nunca diz se um profissional está ou não na clínica.",
          en: "Sofía never gives diagnoses or invents times, and for privacy she never says whether a professional is at the clinic.",
        },
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Sofía trabaja con texto. Todavía no procesa audios ni imágenes: cuando llegan, pide amablemente un mensaje de texto o una visita.",
          pt: "Sofía trabalha com texto. Ainda não processa áudios nem imagens: quando chegam, pede gentilmente uma mensagem de texto ou uma visita.",
          en: "Sofía works with text. She doesn't process audio or images yet: when they arrive, she kindly asks for a text message or a visit.",
        },
      },
    ],
  },
  {
    slug: "personalizar-sofia",
    categoryId: "sofia",
    updated: "2026-06-18",
    readingMinutes: 4,
    keywords: ["personalizar", "instrucciones", "activar", "pausar", "horario", "configurar sofia"],
    related: ["que-hace-sofia", "asumir-conversacion"],
    title: {
      es: "Activar, pausar y personalizar a Sofía",
      pt: "Ativar, pausar e personalizar a Sofía",
      en: "Enable, pause and personalize Sofía",
    },
    excerpt: {
      es: "Ajusta su tono, sus horarios y las instrucciones propias de tu clínica.",
      pt: "Ajuste o tom, os horários e as instruções próprias da sua clínica.",
      en: "Adjust her tone, her hours and your clinic's own instructions.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Con el WhatsApp conectado aparece la tarjeta «Agente Sofía» en el menú WhatsApp. Ahí controlas cómo se comporta.",
          pt: "Com o WhatsApp conectado, aparece o cartão «Agente Sofía» no menu WhatsApp. Ali você controla como ela se comporta.",
          en: "With WhatsApp connected, the “Sofía Agent” card appears in the WhatsApp menu. That's where you control how she behaves.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Interruptor «Sofía activa»: enciéndelo o apágalo para que responda o guarde silencio.",
            pt: "Interruptor «Sofía ativa»: ligue ou desligue para ela responder ou ficar em silêncio.",
            en: "“Sofía active” switch: turn it on or off so she replies or stays silent.",
          },
          {
            es: "Instrucciones de tu clínica: un texto libre que complementa su forma de responder (promociones, tono, reglas).",
            pt: "Instruções da sua clínica: um texto livre que complementa a forma de responder (promoções, tom, regras).",
            en: "Your clinic's instructions: free text that complements how she replies (promotions, tone, rules).",
          },
          {
            es: "Horario comercial y «solo conversaciones nuevas» para que no entre en chats anteriores a su activación.",
            pt: "Horário comercial e «só conversas novas» para não entrar em chats anteriores à ativação.",
            en: "Business hours and “new conversations only” so she doesn't jump into chats older than her activation.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Para pausar todo al instante, apaga «Sofía activa». Desconectar el número también detiene la atención.",
          pt: "Para pausar tudo na hora, desligue «Sofía ativa». Desconectar o número também para o atendimento.",
          en: "To pause everything instantly, turn off “Sofía active”. Disconnecting the number also stops replies.",
        },
      },
    ],
  },
  {
    slug: "asumir-conversacion",
    categoryId: "sofia",
    updated: "2026-06-18",
    readingMinutes: 4,
    keywords: ["asumir", "conversaciones", "control", "atendente", "asumir sofia", "devolver"],
    related: ["que-hace-sofia", "personalizar-sofia"],
    title: {
      es: "Asumir una conversación (que Sofía se detenga)",
      pt: "Assumir uma conversa (fazer a Sofía parar)",
      en: "Take over a conversation (pause Sofía on it)",
    },
    excerpt: {
      es: "Entra tú a un chat cuando quieras: Sofía se detiene solo en esa conversación.",
      pt: "Entre você num chat quando quiser: a Sofía para só naquela conversa.",
      en: "Step into a chat whenever you want: Sofía pauses only on that conversation.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "En el menú WhatsApp, la tarjeta «Conversaciones» muestra el historial de cada chat. Puedes tomar el control de uno sin apagar a Sofía en los demás.",
          pt: "No menu WhatsApp, o cartão «Conversas» mostra o histórico de cada chat. Você pode assumir o controle de um sem desligar a Sofía nos outros.",
          en: "In the WhatsApp menu, the “Conversations” card shows each chat's history. You can take control of one without turning Sofía off elsewhere.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Desde el panel: abre la conversación y pulsa «Asumir». Sofía se pausa ahí; para devolverle el control, pulsa «Devolver a Sofía».",
            pt: "Pelo painel: abra a conversa e clique em «Assumir». A Sofía pausa ali; para devolver o controle, clique em «Devolver à Sofía».",
            en: "From the panel: open the conversation and click “Take over”. Sofía pauses there; to hand it back, click “Give back to Sofía”.",
          },
          {
            es: "Desde el propio WhatsApp: escribe #asumir en el chat para pausarla, y #sofia para devolverle el control.",
            pt: "Pelo próprio WhatsApp: escreva #asumir no chat para pausá-la, e #sofia para devolver o controle.",
            en: "From WhatsApp itself: type #asumir in the chat to pause her, and #sofia to hand control back.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Si el paciente pide un humano, Sofía transfiere y se queda en pausa hasta que la recepción retome la conversación.",
          pt: "Se o paciente pede um humano, a Sofía transfere e fica em pausa até a recepção retomar a conversa.",
          en: "If the patient asks for a human, Sofía transfers and stays paused until the front desk resumes the chat.",
        },
      },
    ],
  },

  // ══════════════════════════ FICHA CLÍNICA ══════════════════════════
  {
    slug: "marcar-el-odontograma",
    categoryId: "clinico",
    updated: "2026-06-10",
    readingMinutes: 5,
    featured: true,
    keywords: ["odontograma", "diente", "cara", "cara", "condicion", "arcada", "sextante", "fdi"],
    related: ["registrar-evolucion", "crear-plan-tratamiento"],
    title: {
      es: "Marcar el odontograma (por pieza y por cara)",
      pt: "Marcar o odontograma (por dente e por face)",
      en: "Mark the odontogram (by tooth and by surface)",
    },
    excerpt: {
      es: "Registra caries, restauraciones y tratamientos cara por cara, con dentición permanente y temporal.",
      pt: "Registre cáries, restaurações e tratamentos face por face, com dentição permanente e temporária.",
      en: "Record caries, restorations and treatments surface by surface, in permanent and primary dentition.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El odontograma vive dentro de la ficha del paciente, en la sección Clínico. Usa notación FDI e incluye dentición permanente y temporal.",
          pt: "O odontograma vive dentro da ficha do paciente, na seção Clínico. Usa notação FDI e inclui dentição permanente e temporária.",
          en: "The odontogram lives inside the patient's chart, in the Clinical section. It uses FDI notation and includes permanent and primary dentition.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "En la barra de herramientas, elige la condición activa (caries, restaurado, corona, implante, ausente, conducto…).",
            pt: "Na barra de ferramentas, escolha a condição ativa (cárie, restaurado, coroa, implante, ausente, canal…).",
            en: "In the toolbar, pick the active condition (caries, filled, crown, implant, missing, root canal…).",
          },
          {
            es: "Haz clic en la cara del diente (vestibular, mesial, distal, lingual u oclusal). Cada clic se guarda al instante.",
            pt: "Clique na face do dente (vestibular, mesial, distal, lingual ou oclusal). Cada clique é salvo na hora.",
            en: "Click the tooth surface (buccal, mesial, distal, lingual or occlusal). Each click saves instantly.",
          },
          {
            es: "Para condiciones de diente entero (ausente, implante, corona), se pinta la pieza completa.",
            pt: "Para condições de dente inteiro (ausente, implante, coroa), pinta-se o dente todo.",
            en: "For whole-tooth conditions (missing, implant, crown), the entire tooth is painted.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Puedes aplicar una condición a una arcada completa o a un sextante de una sola vez. Para deshacer, usa «Limpiar marcación» en el diente.",
          pt: "Você pode aplicar uma condição a uma arcada inteira ou a um sextante de uma vez. Para desfazer, use «Limpar marcação» no dente.",
          en: "You can apply a condition to a whole arch or a sextant at once. To undo, use “Clear marking” on the tooth.",
        },
      },
      {
        type: "callout",
        tone: "info",
        title: { es: "Odontograma vs. evolución", pt: "Odontograma vs. evolução", en: "Odontogram vs. evolution" },
        text: {
          es: "El odontograma es un estado actual editable: lo corriges libremente. Las evoluciones clínicas, en cambio, son inmutables (ver el artículo siguiente).",
          pt: "O odontograma é um estado atual editável: você corrige livremente. As evoluções clínicas, por outro lado, são imutáveis (ver o próximo artigo).",
          en: "The odontogram is an editable current state: you correct it freely. Clinical evolutions, on the other hand, are immutable (see the next article).",
        },
      },
    ],
  },
  {
    slug: "registrar-evolucion",
    categoryId: "clinico",
    updated: "2026-06-10",
    readingMinutes: 5,
    keywords: ["evolucion", "inmutable", "ley 20584", "enmienda", "invalidar", "historia clinica"],
    related: ["marcar-el-odontograma", "crear-plan-tratamiento"],
    title: {
      es: "Evoluciones: por qué no se editan ni se borran",
      pt: "Evoluções: por que não se editam nem se apagam",
      en: "Evolutions: why they can't be edited or deleted",
    },
    excerpt: {
      es: "La evolución clínica es un registro legal inmutable. Se corrige con enmienda, no borrando.",
      pt: "A evolução clínica é um registro legal imutável. Corrige-se com emenda, não apagando.",
      en: "The clinical evolution is an immutable legal record. You correct it with an amendment, not by deleting.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Cada evolución que registras en la ficha queda fija. No se puede editar ni borrar: es una exigencia legal de la historia clínica (ej.: Ley 20.584 en Chile).",
          pt: "Cada evolução que você registra na ficha fica fixa. Não pode ser editada nem apagada: é uma exigência legal do prontuário (ex.: Ley 20.584 no Chile).",
          en: "Every evolution you record in the chart is fixed. It can't be edited or deleted: it's a legal requirement for the medical record (e.g. Law 20.584 in Chile).",
        },
      },
      {
        type: "h2",
        text: { es: "Cómo corregir un error", pt: "Como corrigir um erro", en: "How to fix a mistake" },
      },
      {
        type: "list",
        items: [
          {
            es: "Enmienda: agrega un nuevo registro encadenado al original, con la corrección. El texto original permanece visible.",
            pt: "Emenda: adiciona um novo registro encadeado ao original, com a correção. O texto original permanece visível.",
            en: "Amendment: adds a new record chained to the original, with the correction. The original text stays visible.",
          },
          {
            es: "Invalidar (anular): marca la evolución como inválida con un motivo. Solo un superadministrador puede hacerlo.",
            pt: "Invalidar (anular): marca a evolução como inválida com um motivo. Só um superadministrador pode fazer isso.",
            en: "Invalidate: marks the evolution as void with a reason. Only a super-administrator can do this.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        text: {
          es: "Las evoluciones migradas desde otro sistema tienen blindaje extra: no se enmiendan, ni siquiera por un superadministrador.",
          pt: "As evoluções migradas de outro sistema têm blindagem extra: não se emendam, nem por um superadministrador.",
          en: "Evolutions migrated from another system have extra protection: they can't be amended, not even by a super-administrator.",
        },
      },
    ],
  },
  {
    slug: "crear-plan-tratamiento",
    categoryId: "clinico",
    updated: "2026-05-22",
    readingMinutes: 5,
    keywords: ["plan", "tratamiento", "presupuesto", "aceptar", "realizar", "avance", "procedimiento"],
    related: ["marcar-el-odontograma"],
    title: {
      es: "Crear y aceptar un plan de tratamiento",
      pt: "Criar e aceitar um plano de tratamento",
      en: "Create and accept a treatment plan",
    },
    excerpt: {
      es: "Arma el plan por piezas, acéptalo para generar la cuenta y registra el avance de cada procedimiento.",
      pt: "Monte o plano por dentes, aceite para gerar a conta e registre o avanço de cada procedimento.",
      en: "Build the plan by teeth, accept it to generate the account and record each procedure's progress.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Los planes se crean desde la ficha del paciente. Empiezas con un borrador y agregas procedimientos por diente; el total se recalcula solo.",
          pt: "Os planos são criados na ficha do paciente. Você começa com um rascunho e adiciona procedimentos por dente; o total é recalculado sozinho.",
          en: "Plans are created from the patient's chart. You start with a draft and add procedures per tooth; the total recalculates automatically.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Agrega procedimientos (por pieza, con cantidad, precio y descuento opcional).",
            pt: "Adicione procedimentos (por dente, com quantidade, preço e desconto opcional).",
            en: "Add procedures (per tooth, with quantity, price and optional discount).",
          },
          {
            es: "Acepta el plan: se genera la cuenta por cobrar con sus cuotas.",
            pt: "Aceite o plano: gera-se a conta a receber com suas parcelas.",
            en: "Accept the plan: the receivable account with its instalments is generated.",
          },
          {
            es: "A medida que atiendes, registra el avance del procedimiento (25 %, 50 %, 75 %, 100 %).",
            pt: "Conforme atende, registre o avanço do procedimento (25 %, 50 %, 75 %, 100 %).",
            en: "As you treat, record the procedure's progress (25%, 50%, 75%, 100%).",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Registrar avance crea una evolución en la ficha y, si el procedimiento define un resultado, actualiza el odontograma. También alimenta la liquidación del profesional. Una vez con cuenta por cobrar, el plan se bloquea para edición.",
          pt: "Registrar avanço cria uma evolução na ficha e, se o procedimento define um resultado, atualiza o odontograma. Também alimenta o repasse do profissional. Uma vez com conta a receber, o plano trava para edição.",
          en: "Recording progress creates an evolution in the chart and, if the procedure defines a result, updates the odontogram. It also feeds the professional's payout. Once it has a receivable, the plan locks for editing.",
        },
      },
    ],
  },

  // ═══════════════════════ IMÁGENES E IA CLÍNICA ═══════════════════════
  {
    slug: "casos-con-ia",
    categoryId: "imagenes",
    updated: "2026-06-01",
    readingMinutes: 6,
    featured: true,
    keywords: ["caso", "ia", "simulacion", "sonrisa", "foto", "diagnostico", "plan ia"],
    related: ["crear-plan-tratamiento"],
    title: {
      es: "Crear un caso con IA y simular la sonrisa",
      pt: "Criar um caso com IA e simular o sorriso",
      en: "Create an AI case and simulate the smile",
    },
    excerpt: {
      es: "A partir de una foto, la IA analiza, propone un plan y genera una simulación visual del resultado.",
      pt: "A partir de uma foto, a IA analisa, propõe um plano e gera uma simulação visual do resultado.",
      en: "From a photo, the AI analyzes, proposes a plan and generates a visual simulation of the result.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Los casos con IA se crean en el menú Casos IA, con un asistente paso a paso. Es una herramienta de apoyo profesional, no un diagnóstico definitivo.",
          pt: "Os casos com IA são criados no menu Casos IA, com um assistente passo a passo. É uma ferramenta de apoio profissional, não um diagnóstico definitivo.",
          en: "AI cases are created in the AI Cases menu, with a step-by-step wizard. It's a professional support tool, not a definitive diagnosis.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Elige o crea el paciente y selecciona el modo: sugerencia con IA, definición manual o un tratamiento específico.",
            pt: "Escolha ou crie o paciente e selecione o modo: sugestão com IA, definição manual ou um tratamento específico.",
            en: "Choose or create the patient and select the mode: AI suggestion, manual definition or a specific treatment.",
          },
          {
            es: "Sube una foto de la sonrisa y pulsa «Analizar con IA».",
            pt: "Envie uma foto do sorriso e clique em «Analisar com IA».",
            en: "Upload a photo of the smile and click “Analyze with AI”.",
          },
          {
            es: "La IA devuelve un análisis y un plan sugerido; puedes generar además una simulación visual (antes/después).",
            pt: "A IA devolve uma análise e um plano sugerido; você pode gerar ainda uma simulação visual (antes/depois).",
            en: "The AI returns an analysis and a suggested plan; you can also generate a visual simulation (before/after).",
          },
          {
            es: "Convierte el plan sugerido en un plan de tratamiento real con los precios de tu catálogo.",
            pt: "Converta o plano sugerido em um plano de tratamento real com os preços do seu catálogo.",
            en: "Convert the suggested plan into a real treatment plan with your catalog's prices.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Para que el plan de la IA tenga valores, tu clínica debe tener los procedimientos cargados. Si no, la IA propone el tratamiento pero sin precios.",
          pt: "Para o plano da IA ter valores, sua clínica precisa ter os procedimentos cadastrados. Se não, a IA propõe o tratamento mas sem preços.",
          en: "For the AI plan to have values, your clinic must have its procedures loaded. Otherwise the AI proposes the treatment but without prices.",
        },
      },
    ],
  },

  // ═══════════════════════════ CAJA Y COBROS ═══════════════════════════
  {
    slug: "abrir-y-cerrar-caja",
    categoryId: "finanzas",
    updated: "2026-06-15",
    readingMinutes: 5,
    featured: true,
    keywords: ["caja", "caixa", "abrir", "cerrar", "cierre", "saldo", "medianoche", "movimiento"],
    related: ["registrar-un-cobro", "estornar-un-cobro"],
    title: {
      es: "Abrir y cerrar caja",
      pt: "Abrir e fechar o caixa",
      en: "Open and close the cash drawer",
    },
    excerpt: {
      es: "Cada operador tiene su caja. Así se abre, se registra y se cierra al final del día.",
      pt: "Cada operador tem seu caixa. Assim se abre, registra e fecha no fim do dia.",
      en: "Each operator has their own drawer. Here's how to open, record and close it.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Las cajas viven en Financiero → Cajas. Cada operador puede tener una caja abierta a la vez; un administrador puede abrir una para otra persona.",
          pt: "Os caixas ficam em Financeiro → Caixas. Cada operador pode ter um caixa aberto por vez; um administrador pode abrir para outra pessoa.",
          en: "Cash drawers live in Finance → Cash. Each operator can have one open drawer at a time; an admin can open one for someone else.",
        },
      },
      {
        type: "illustration",
        illustration: "pantalla-caja",
        caption: {
          es: "Al cerrar, ves el saldo calculado; el contado es opcional.",
          pt: "Ao fechar, você vê o saldo calculado; o contado é opcional.",
          en: "On close, you see the calculated balance; counting is optional.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Abre tu caja: verás el saldo de la caja anterior y confirmas el saldo de apertura (el efectivo inicial).",
            pt: "Abra seu caixa: você verá o saldo do caixa anterior e confirma o saldo de abertura (o troco inicial).",
            en: "Open your drawer: you'll see the previous drawer's balance and confirm the opening balance (starting cash).",
          },
          {
            es: "Durante el día, los cobros entran solos. También puedes lanzar movimientos manuales: entrada, salida, sangría o suprimento.",
            pt: "Durante o dia, os recebimentos entram sozinhos. Você também pode lançar movimentos manuais: entrada, saída, sangria ou suprimento.",
            en: "During the day, payments come in automatically. You can also add manual movements: cash in, cash out, withdrawal or top-up.",
          },
          {
            es: "Al terminar, pulsa Cerrar caja. Se muestra el saldo calculado (inicial + entradas − salidas); si quieres, escribes el contado y una observación.",
            pt: "Ao terminar, clique em Fechar caixa. Mostra-se o saldo calculado (inicial + entradas − saídas); se quiser, escreve o contado e uma observação.",
            en: "When done, click Close drawer. The calculated balance is shown (opening + in − out); optionally you enter the counted amount and a note.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: { es: "Cierre automático a medianoche", pt: "Fechamento automático à meia-noite", en: "Automatic midnight close" },
        text: {
          es: "Si olvidas cerrar, la caja se cierra sola a medianoche en la zona horaria de tu clínica, con el saldo calculado, y abre una nueva para el día siguiente.",
          pt: "Se você esquecer de fechar, o caixa fecha sozinho à meia-noite no fuso da sua clínica, com o saldo calculado, e abre um novo para o dia seguinte.",
          en: "If you forget to close, the drawer closes itself at midnight in your clinic's time zone, with the calculated balance, and opens a new one for the next day.",
        },
      },
    ],
  },
  {
    slug: "registrar-un-cobro",
    categoryId: "finanzas",
    updated: "2026-05-23",
    readingMinutes: 4,
    keywords: ["cobro", "pago", "split", "efectivo", "tarjeta", "medios de pago", "parcela"],
    related: ["abrir-y-cerrar-caja", "estornar-un-cobro"],
    title: {
      es: "Registrar un cobro con varios medios de pago",
      pt: "Registrar uma cobrança com vários meios de pagamento",
      en: "Record a payment with several payment methods",
    },
    excerpt: {
      es: "Divide una cuota entre efectivo, tarjeta y más, en un solo registro.",
      pt: "Divida uma parcela entre dinheiro, cartão e mais, num só registro.",
      en: "Split an instalment across cash, card and more, in a single record.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Registras un cobro desde la cuenta o el plan del paciente. Puedes combinar varios medios de pago para una misma cuota.",
          pt: "Você registra uma cobrança na conta ou no plano do paciente. Dá para combinar vários meios de pagamento para uma mesma parcela.",
          en: "You record a payment from the patient's account or plan. You can combine several payment methods for the same instalment.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "En la cuota, pulsa «Registrar pago». La primera línea viene con el saldo.",
            pt: "Na parcela, clique em «Registrar pagamento». A primeira linha vem com o saldo.",
            en: "On the instalment, click “Record payment”. The first line comes with the balance.",
          },
          {
            es: "Añade métodos (ej.: mitad en efectivo, mitad en tarjeta) mientras quede saldo por cubrir.",
            pt: "Adicione métodos (ex.: metade em dinheiro, metade no cartão) enquanto restar saldo a cobrir.",
            en: "Add methods (e.g. half in cash, half by card) while there's balance to cover.",
          },
          {
            es: "Confirma. Si el paciente tiene saldo a favor, puedes usarlo como medio de pago.",
            pt: "Confirme. Se o paciente tem saldo a favor, você pode usá-lo como meio de pagamento.",
            en: "Confirm. If the patient has a credit balance, you can use it as a payment method.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El sistema no te deja cobrar más que el saldo de la cuota. Al quedar saldada, el paciente recibe un correo de confirmación.",
          pt: "O sistema não deixa cobrar mais que o saldo da parcela. Ao ser quitada, o paciente recebe um e-mail de confirmação.",
          en: "The system won't let you charge more than the instalment's balance. Once settled, the patient gets a confirmation email.",
        },
      },
    ],
  },
  {
    slug: "estornar-un-cobro",
    categoryId: "finanzas",
    updated: "2026-05-23",
    readingMinutes: 3,
    keywords: ["estorno", "reverso", "anular pago", "motivo", "administrador", "error"],
    related: ["registrar-un-cobro"],
    title: {
      es: "Estornar un cobro registrado por error",
      pt: "Estornar uma cobrança registrada por engano",
      en: "Reverse a payment recorded by mistake",
    },
    excerpt: {
      es: "Solo administradores, siempre con motivo, y sin borrar el registro original.",
      pt: "Só administradores, sempre com motivo, e sem apagar o registro original.",
      en: "Admins only, always with a reason, and without deleting the original record.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El estorno revierte un pago mal ingresado dejando rastro completo. Por separación de funciones, solo un administrador puede hacerlo.",
          pt: "O estorno reverte um pagamento lançado errado deixando rastro completo. Por separação de funções, só um administrador pode fazer isso.",
          en: "A reversal undoes a wrongly entered payment leaving a full trail. For separation of duties, only an administrator can do it.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Como administrador, abre el pago registrado y pulsa «Estornar».",
            pt: "Como administrador, abra o pagamento registrado e clique em «Estornar».",
            en: "As an administrator, open the recorded payment and click “Reverse”.",
          },
          {
            es: "Escribe el motivo (obligatorio). Confirma.",
            pt: "Escreva o motivo (obrigatório). Confirme.",
            en: "Write the reason (required). Confirm.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El pago original nunca se borra: queda marcado como estornado y se genera una salida de caja trazable. Si era saldo a favor, el crédito se devuelve al paciente.",
          pt: "O pagamento original nunca é apagado: fica marcado como estornado e gera uma saída de caixa rastreável. Se era saldo a favor, o crédito volta ao paciente.",
          en: "The original payment is never deleted: it's marked as reversed and a traceable cash-out is created. If it was a credit balance, the credit returns to the patient.",
        },
      },
    ],
  },
  {
    slug: "liquidaciones-profesionales",
    categoryId: "finanzas",
    updated: "2026-07-02",
    readingMinutes: 5,
    keywords: ["liquidacion", "comision", "profesional", "produccion", "periodo", "retencion", "pagar"],
    related: ["registrar-un-cobro"],
    title: {
      es: "Liquidaciones a profesionales",
      pt: "Repasses a profissionais",
      en: "Professional payouts",
    },
    excerpt: {
      es: "Calcula la comisión de cada profesional por semana, mes o rango libre.",
      pt: "Calcule a comissão de cada profissional por semana, mês ou intervalo livre.",
      en: "Calculate each professional's commission by week, month or free range.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Las liquidaciones viven en Financiero → Liquidaciones. El dentista ve solo su propia producción; el administrador, la de cualquiera.",
          pt: "Os repasses ficam em Financeiro → Liquidações. O dentista vê só a própria produção; o administrador, a de qualquer um.",
          en: "Payouts live in Finance → Payouts. The dentist sees only their own production; the admin, anyone's.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Elige el profesional y el período (preset de semana/mes/año o un rango de fechas libre) y pulsa Calcular.",
            pt: "Escolha o profissional e o período (preset de semana/mês/ano ou um intervalo de datas livre) e clique em Calcular.",
            en: "Choose the professional and the period (week/month/year preset or a free date range) and click Calculate.",
          },
          {
            es: "Revisa el detalle ítem por ítem (paciente, procedimiento, valor, comisión) y el neto a pagar. Crea la liquidación.",
            pt: "Revise o detalhe item a item (paciente, procedimento, valor, comissão) e o líquido a pagar. Crie o repasse.",
            en: "Review the item-by-item detail (patient, procedure, value, commission) and the net to pay. Create the payout.",
          },
          {
            es: "Al marcarla como pagada, se crea automáticamente un gasto de nómina por ese valor.",
            pt: "Ao marcar como paga, cria-se automaticamente uma despesa de folha por esse valor.",
            en: "When you mark it paid, a payroll expense for that amount is created automatically.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "La comisión sale del cobro recibido (no de concluir el procedimiento). En Argentina, si el paciente tiene convenio con retención, esta reduce la producción antes de la comisión.",
          pt: "A comissão sai do recebimento (não de concluir o procedimento). Na Argentina, se o paciente tem convênio com retención, ela reduz a produção antes da comissão.",
          en: "Commission comes from the payment received (not from finishing the procedure). In Argentina, if the patient has an insurer with withholding, it reduces production before commission.",
        },
      },
    ],
  },
  {
    slug: "cobro-automatico-membresias",
    categoryId: "finanzas",
    updated: "2026-05-30",
    readingMinutes: 4,
    keywords: ["membresia", "suscripcion", "recurrente", "automatico", "mercadopago", "pasarela"],
    related: ["registrar-un-cobro"],
    title: {
      es: "Cobro automático de membresías",
      pt: "Cobrança automática de mensalidades",
      en: "Automatic membership billing",
    },
    excerpt: {
      es: "Suscripciones de pacientes que se cobran solas con recordatorios por WhatsApp y email.",
      pt: "Assinaturas de pacientes que se cobram sozinhas com lembretes por WhatsApp e e-mail.",
      en: "Patient subscriptions that bill themselves with WhatsApp and email reminders.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Las membresías permiten cobrar a un paciente de forma recurrente. El cobro puede ser automático mediante una pasarela de pago.",
          pt: "As mensalidades permitem cobrar um paciente de forma recorrente. A cobrança pode ser automática por uma pasarela de pagamento.",
          en: "Memberships let you charge a patient on a recurring basis. Billing can be automatic through a payment gateway.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Configura la pasarela de pago de tu clínica en Configuraciones (Pasarelas de pago).",
            pt: "Configure a pasarela de pagamento da sua clínica em Configurações (Pasarelas de pagamento).",
            en: "Set up your clinic's payment gateway in Settings (Payment gateways).",
          },
          {
            es: "Crea la suscripción del paciente (paciente + plan + fecha de inicio) y activa el cobro automático.",
            pt: "Crie a assinatura do paciente (paciente + plano + data de início) e ative a cobrança automática.",
            en: "Create the patient's subscription (patient + plan + start date) and enable automatic billing.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Con el cobro automático activo, el sistema genera cada período el enlace de pago y envía recordatorios por WhatsApp y correo. Apagar el interruptor pausa todo al instante.",
          pt: "Com a cobrança automática ativa, o sistema gera a cada período o link de pagamento e envia lembretes por WhatsApp e e-mail. Desligar o interruptor pausa tudo na hora.",
          en: "With automatic billing on, the system generates the payment link each period and sends WhatsApp and email reminders. Turning off the switch pauses everything instantly.",
        },
      },
    ],
  },

  // ══════════════════════════════ TÓTEM ══════════════════════════════
  {
    slug: "check-in-en-el-totem",
    categoryId: "totem",
    updated: "2026-06-14",
    readingMinutes: 4,
    keywords: ["totem", "autoatencion", "check-in", "recepcion", "documento", "fila", "box"],
    related: ["activar-agenda-publica"],
    title: {
      es: "Los tótems y el check-in del paciente",
      pt: "Os totens e o check-in do paciente",
      en: "The kiosks and patient check-in",
    },
    excerpt: {
      es: "Autoatención en la sala de espera: el paciente confirma su llegada con su documento.",
      pt: "Autoatendimento na sala de espera: o paciente confirma a chegada com o documento.",
      en: "Waiting-room self-service: the patient confirms arrival with their document.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Desde el menú Autoatención abres los tótems, que corren en el navegador de un tablet o pantalla: Recepción, Panel de Fila y Box del consultorio.",
          pt: "No menu Autoatendimento você abre os totens, que rodam no navegador de um tablet ou tela: Recepção, Painel de Fila e Box do consultório.",
          en: "From the Self-service menu you open the kiosks, which run in a tablet or screen browser: Reception, Queue panel and consulting-room Box.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "El paciente ingresa su documento en el tótem de Recepción. El teclado se adapta a tu país (RUT en Chile, CPF, DNI, CURP…).",
            pt: "O paciente digita o documento no totem de Recepção. O teclado se adapta ao seu país (RUT no Chile, CPF, DNI, CURP…).",
            en: "The patient enters their document on the Reception kiosk. The keypad adapts to your country (RUT in Chile, CPF, DNI, CURP…).",
          },
          {
            es: "Si no está registrado, hace un registro rápido ahí mismo. Luego confirma sus datos y su cita del día.",
            pt: "Se não estiver cadastrado, faz um cadastro rápido ali mesmo. Depois confirma seus dados e a consulta do dia.",
            en: "If not registered, they do a quick sign-up right there. Then they confirm their details and today's appointment.",
          },
          {
            es: "Si hay consentimientos pendientes, los firma en pantalla (es opcional). Al terminar, ve su posición en la fila.",
            pt: "Se houver consentimentos pendentes, assina na tela (é opcional). Ao terminar, vê sua posição na fila.",
            en: "If there are pending consents, they sign on screen (optional). When done, they see their place in the queue.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Desde el Box, el profesional llama al paciente e inicia y finaliza la atención, y la fila se actualiza para la sala de espera.",
          pt: "No Box, o profissional chama o paciente e inicia e finaliza o atendimento, e a fila se atualiza para a sala de espera.",
          en: "From the Box, the professional calls the patient and starts and ends the visit, and the queue updates for the waiting room.",
        },
      },
    ],
  },

  // ═══════════════════════ CUENTA Y SEGURIDAD ═══════════════════════
  {
    slug: "usuarios-y-roles",
    categoryId: "cuenta",
    updated: "2026-06-12",
    readingMinutes: 5,
    keywords: ["usuarios", "roles", "permisos", "equipo", "crear usuario", "acceso", "modulos"],
    related: ["configurar-tu-clinica"],
    title: {
      es: "Usuarios, roles y permisos del equipo",
      pt: "Usuários, papéis e permissões da equipe",
      en: "Users, roles and team permissions",
    },
    excerpt: {
      es: "Crea cuentas para tu equipo y define qué puede ver y hacer cada persona.",
      pt: "Crie contas para sua equipe e defina o que cada pessoa pode ver e fazer.",
      en: "Create accounts for your team and define what each person can see and do.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Los usuarios se gestionan en Administración → Profesionales. Ahí creas cuentas, asignas roles y ajustas permisos.",
          pt: "Os usuários são geridos em Administração → Profissionais. Ali você cria contas, atribui papéis e ajusta permissões.",
          en: "Users are managed in Administration → Professionals. There you create accounts, assign roles and adjust permissions.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Pulsa «+», ingresa nombre, email, una contraseña temporal y el rol (dentista, secretaria, asistente dental, laboratorio o administrador).",
            pt: "Clique em «+», informe nome, e-mail, uma senha temporária e o papel (dentista, secretária, auxiliar, laboratório ou administrador).",
            en: "Click “+”, enter name, email, a temporary password and the role (dentist, front desk, dental assistant, lab or admin).",
          },
          {
            es: "Desde «Perfil» del usuario puedes cambiar su rol, ajustar el acceso a módulos, restablecer su contraseña o bloquearlo.",
            pt: "No «Perfil» do usuário você pode mudar o papel, ajustar o acesso a módulos, redefinir a senha ou bloqueá-lo.",
            en: "From the user's “Profile” you can change their role, adjust module access, reset their password or block them.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Cada rol trae un acceso base y puedes afinarlo por módulo. Solo el rol Dentista cuenta como asiento de cobro de tu plan: dar módulos a una secretaria no cambia lo que pagas.",
          pt: "Cada papel traz um acesso base e você pode afiná-lo por módulo. Só o papel Dentista conta como assento de cobrança do seu plano: dar módulos a uma secretária não muda o que você paga.",
          en: "Each role has a base access and you can fine-tune it per module. Only the Dentist role counts as a billable seat on your plan: giving modules to a front-desk user doesn't change what you pay.",
        },
      },
    ],
  },

  // ─── Ola 2 ───

  // PRIMEROS PASOS
  {
    slug: "profesionales-y-especialidades",
    categoryId: "primeros-pasos",
    updated: "2026-05-30",
    readingMinutes: 4,
    keywords: ["profesional", "profissional", "especialidad", "especialidade", "color", "agenda", "comision"],
    related: ["configurar-tu-clinica", "usuarios-y-roles"],
    title: {
      es: "Agregar profesionales y sus especialidades",
      pt: "Adicionar profissionais e suas especialidades",
      en: "Add professionals and their specialties",
    },
    excerpt: {
      es: "Cada profesional con su color de agenda, sus especialidades y su comisión.",
      pt: "Cada profissional com sua cor de agenda, suas especialidades e sua comissão.",
      en: "Each professional with their agenda color, specialties and commission.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Los profesionales y las especialidades que ofrece tu clínica se gestionan en Administración, en sus pestañas correspondientes.",
          pt: "Os profissionais e as especialidades que sua clínica oferece são geridos em Administração, nas abas correspondentes.",
          en: "The professionals and specialties your clinic offers are managed under Administration, in their respective tabs.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "En la pestaña Profesionales, agrega a cada uno con su nombre, apodo, color de agenda y especialidades.",
            pt: "Na aba Profissionais, adicione cada um com nome, apelido, cor de agenda e especialidades.",
            en: "In the Professionals tab, add each one with their name, nickname, agenda color and specialties.",
          },
          {
            es: "Define su comisión (%): es la que usará el sistema al calcular las liquidaciones.",
            pt: "Defina a comissão (%): é a que o sistema usará ao calcular os repasses.",
            en: "Set their commission (%): it's what the system uses when calculating payouts.",
          },
          {
            es: "En la pestaña Especialidades, activa las que ofreces con un clic o crea una personalizada.",
            pt: "Na aba Especialidades, ative as que você oferece com um clique ou crie uma personalizada.",
            en: "In the Specialties tab, turn on the ones you offer with one click or create a custom one.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El color de agenda distingue visualmente a cada profesional en el calendario. Las especialidades del catálogo se pueden desactivar; solo las personalizadas se eliminan.",
          pt: "A cor de agenda distingue visualmente cada profissional no calendário. As especialidades do catálogo podem ser desativadas; só as personalizadas são excluídas.",
          en: "The agenda color visually distinguishes each professional on the calendar. Catalog specialties can be deactivated; only custom ones can be deleted.",
        },
      },
    ],
  },

  // IMÁGENES E IA CLÍNICA
  {
    slug: "sesion-de-fotos",
    categoryId: "imagenes",
    updated: "2026-05-24",
    readingMinutes: 4,
    keywords: ["fotos", "foto", "clinica", "protocolo", "9 tomas", "comparacion", "intraoral"],
    related: ["casos-con-ia", "radiografia-informe-ia"],
    title: {
      es: "Sesión de fotos clínicas (protocolo de 9 tomas)",
      pt: "Sessão de fotos clínicas (protocolo de 9 tomas)",
      en: "Clinical photo session (9-shot protocol)",
    },
    excerpt: {
      es: "Documenta el caso con un protocolo fotográfico estándar y compara la evolución.",
      pt: "Documente o caso com um protocolo fotográfico padrão e compare a evolução.",
      en: "Document the case with a standard photo protocol and compare progress.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "En el menú Exámenes, la pestaña Fotos organiza cada sesión en un protocolo de 9 tomas (3 extraorales y 6 intraorales).",
          pt: "No menu Exames, a aba Fotos organiza cada sessão em um protocolo de 9 tomas (3 extraorais e 6 intraorais).",
          en: "In the Exams menu, the Photos tab organizes each session into a 9-shot protocol (3 extraoral and 6 intraoral).",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Abre la ficha de exámenes del paciente y crea una sesión de fotos.",
            pt: "Abra a ficha de exames do paciente e crie uma sessão de fotos.",
            en: "Open the patient's exam record and create a photo session.",
          },
          {
            es: "Sube cada toma en su lugar. Una sesión completa muestra 9 de 9.",
            pt: "Envie cada tomada no seu lugar. Uma sessão completa mostra 9 de 9.",
            en: "Upload each shot in its slot. A complete session shows 9 of 9.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Con dos o más sesiones, el modo comparación las muestra lado a lado para ver la evolución del tratamiento.",
          pt: "Com duas ou mais sessões, o modo comparação as mostra lado a lado para ver a evolução do tratamento.",
          en: "With two or more sessions, comparison mode shows them side by side to see the treatment's progress.",
        },
      },
    ],
  },
  {
    slug: "radiografia-informe-ia",
    categoryId: "imagenes",
    updated: "2026-06-01",
    readingMinutes: 4,
    keywords: ["radiografia", "radiografía", "informe", "ia", "panoramica", "cefalometrica", "bitewing"],
    related: ["casos-con-ia", "visor-dicom-3d"],
    title: {
      es: "Subir una radiografía y generar informe con IA",
      pt: "Enviar uma radiografia e gerar laudo com IA",
      en: "Upload a radiograph and generate an AI report",
    },
    excerpt: {
      es: "Sube la placa y obtén un informe estructurado de apoyo, generado por IA.",
      pt: "Envie a placa e obtenha um laudo estruturado de apoio, gerado por IA.",
      en: "Upload the film and get a structured support report, generated by AI.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "En Exámenes, la pestaña Radiografías te deja subir la imagen y pedir un informe de apoyo a la IA. Es una ayuda, no reemplaza tu lectura profesional.",
          pt: "Em Exames, a aba Radiografias permite enviar a imagem e pedir um laudo de apoio à IA. É uma ajuda, não substitui sua leitura profissional.",
          en: "In Exams, the Radiographs tab lets you upload the image and request an AI support report. It's an aid, not a replacement for your professional reading.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Sube la radiografía (arrastrar y soltar) e indica su tipo.",
            pt: "Envie a radiografia (arrastar e soltar) e indique o tipo.",
            en: "Upload the radiograph (drag & drop) and set its type.",
          },
          {
            es: "Pulsa «Analizar con IA». El informe aparece para copiar o imprimir.",
            pt: "Clique em «Analisar com IA». O laudo aparece para copiar ou imprimir.",
            en: "Click “Analyze with AI”. The report appears to copy or print.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El análisis por IA está disponible para panorámicas, cefalométricas y bitewing. El informe se genera a pedido y no queda guardado como parte de la ficha.",
          pt: "A análise por IA está disponível para panorâmicas, cefalométricas e bitewing. O laudo é gerado sob demanda e não fica salvo como parte da ficha.",
          en: "AI analysis is available for panoramic, cephalometric and bitewing images. The report is generated on demand and isn't saved as part of the chart.",
        },
      },
    ],
  },
  {
    slug: "visor-dicom-3d",
    categoryId: "imagenes",
    updated: "2026-05-27",
    readingMinutes: 5,
    keywords: ["dicom", "3d", "cbct", "visor", "tomografia", "zip", "medicion", "preset"],
    related: ["radiografia-informe-ia"],
    title: {
      es: "Visor DICOM 3D: cargar y medir un estudio",
      pt: "Visor DICOM 3D: carregar e medir um estudo",
      en: "3D DICOM viewer: load and measure a study",
    },
    excerpt: {
      es: "Sube un CBCT desde un ZIP y explóralo con herramientas de medición y presets dentales.",
      pt: "Envie um CBCT a partir de um ZIP e explore-o com ferramentas de medição e presets dentais.",
      en: "Upload a CBCT from a ZIP and explore it with measurement tools and dental presets.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El visor 3D vive en el menú Imágenes 3D. Carga estudios DICOM (CBCT) y los explora corte a corte en el navegador, sin instalar nada.",
          pt: "O visor 3D vive no menu Imagens 3D. Carrega estudos DICOM (CBCT) e os explora corte a corte no navegador, sem instalar nada.",
          en: "The 3D viewer lives in the 3D Images menu. It loads DICOM (CBCT) studies and explores them slice by slice in the browser, with nothing to install.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Sube el estudio como un archivo ZIP con los .dcm. El sistema los procesa por lotes.",
            pt: "Envie o estudo como um arquivo ZIP com os .dcm. O sistema os processa em lotes.",
            en: "Upload the study as a ZIP with the .dcm files. The system processes them in batches.",
          },
          {
            es: "En el visor, navega los cortes y usa las herramientas de medición (longitud, ángulo, áreas, HU) y los presets dentales (hueso, implante, tejido, endo).",
            pt: "No visor, navegue pelos cortes e use as ferramentas de medição (comprimento, ângulo, áreas, HU) e os presets dentais (osso, implante, tecido, endo).",
            en: "In the viewer, navigate the slices and use the measurement tools (length, angle, areas, HU) and dental presets (bone, implant, tissue, endo).",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Puedes restringir un estudio para que solo lo vea quien lo subió y los administradores. Por ahora el visor trabaja con vista única (aún no reconstrucción multiplanar de tres vistas).",
          pt: "Você pode restringir um estudo para que só o veja quem o enviou e os administradores. Por ora o visor trabalha com vista única (ainda não reconstrução multiplanar de três vistas).",
          en: "You can restrict a study so only the uploader and admins can see it. For now the viewer works with a single view (no three-view multiplanar reconstruction yet).",
        },
      },
    ],
  },
  {
    slug: "ortodoncia-casos",
    categoryId: "imagenes",
    updated: "2026-05-31",
    readingMinutes: 5,
    keywords: ["ortodoncia", "alineadores", "brackets", "invisalign", "control", "sesion", "panel"],
    related: ["activar-agenda-publica"],
    title: {
      es: "Ortodoncia: alineadores, brackets y panel de control",
      pt: "Ortodontia: alinhadores, brackets e painel de controle",
      en: "Orthodontics: aligners, brackets and control panel",
    },
    excerpt: {
      es: "Gestiona casos de alineadores o brackets, sus sesiones y el control de pacientes activos.",
      pt: "Gerencie casos de alinhadores ou brackets, suas sessões e o controle de pacientes ativos.",
      en: "Manage aligner or bracket cases, their sessions and the control of active patients.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El módulo de ortodoncia (menú Alineadores) maneja las dos modalidades: alineadores (Invisalign, ClearCorrect y otros) y brackets.",
          pt: "O módulo de ortodontia (menu Alinhadores) trata as duas modalidades: alinhadores (Invisalign, ClearCorrect e outros) e brackets.",
          en: "The orthodontics module (Aligners menu) handles both modalities: aligners (Invisalign, ClearCorrect and others) and brackets.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Crea el caso eligiendo la modalidad y sus datos (sistema, arcadas, totales o fase).",
            pt: "Crie o caso escolhendo a modalidade e seus dados (sistema, arcadas, totais ou fase).",
            en: "Create the case choosing the modality and its data (system, arches, totals or phase).",
          },
          {
            es: "Registra las sesiones clínicas a medida que avanza el tratamiento.",
            pt: "Registre as sessões clínicas conforme o tratamento avança.",
            en: "Record clinical sessions as the treatment progresses.",
          },
          {
            es: "El panel de control clasifica los casos activos: vencidos, sin retorno y por vencer.",
            pt: "O painel de controle classifica os casos ativos: vencidos, sem retorno e a vencer.",
            en: "The control panel classifies active cases: overdue, no-show and due soon.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Desde el panel puedes enviar al paciente una invitación para que agende su control solo. Para eso, la agenda pública de tu clínica debe estar activa.",
          pt: "Do painel você pode enviar ao paciente um convite para ele agendar o controle sozinho. Para isso, a agenda pública da sua clínica precisa estar ativa.",
          en: "From the panel you can send the patient an invitation to book their check-up themselves. For that, your clinic's public agenda must be active.",
        },
      },
    ],
  },

  // FINANZAS — convenios y saldos
  {
    slug: "saldo-a-favor",
    categoryId: "finanzas",
    updated: "2026-07-02",
    readingMinutes: 3,
    keywords: ["saldo", "favor", "anticipo", "cuenta corriente", "credito", "prepago"],
    related: ["registrar-un-cobro"],
    title: {
      es: "Saldo a favor y cuenta corriente del paciente",
      pt: "Saldo a favor e conta corrente do paciente",
      en: "Patient credit balance and running account",
    },
    excerpt: {
      es: "Registra anticipos y úsalos después para pagar cuotas.",
      pt: "Registre adiantamentos e use-os depois para pagar parcelas.",
      en: "Record advances and use them later to pay instalments.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Un paciente puede dejar dinero a cuenta (un anticipo) y usarlo más adelante. Ese saldo a favor se gestiona en el panel financiero de su ficha.",
          pt: "Um paciente pode deixar dinheiro em conta (um adiantamento) e usá-lo mais adiante. Esse saldo a favor é gerido no painel financeiro da ficha dele.",
          en: "A patient can leave money on account (an advance) and use it later. That credit balance is managed in their chart's financial panel.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Registrar anticipo: entra como saldo a favor y como entrada de caja.",
            pt: "Registrar adiantamento: entra como saldo a favor e como entrada de caixa.",
            en: "Record advance: it enters as credit balance and as a cash-in.",
          },
          {
            es: "Al cobrar, elige «Usar saldo a favor» como medio de pago.",
            pt: "Ao cobrar, escolha «Usar saldo a favor» como meio de pagamento.",
            en: "When charging, choose “Use credit balance” as the payment method.",
          },
          {
            es: "Un anticipo no usado se puede estornar (genera una salida de caja trazable).",
            pt: "Um adiantamento não usado pode ser estornado (gera uma saída de caixa rastreável).",
            en: "An unused advance can be reversed (it generates a traceable cash-out).",
          },
        ],
      },
    ],
  },
  {
    slug: "convenios-y-retencion",
    categoryId: "finanzas",
    updated: "2026-07-02",
    readingMinutes: 4,
    keywords: ["convenio", "obra social", "financiador", "retencion", "coseguro", "argentina"],
    related: ["liquidaciones-profesionales"],
    title: {
      es: "Convenios, obras sociales y retención",
      pt: "Convênios, obras sociais e retención",
      en: "Insurers, health plans and withholding",
    },
    excerpt: {
      es: "Cadastra un financiador con su retención y así impacta la liquidación del profesional.",
      pt: "Cadastre um financiador com sua retención e veja como impacta o repasse do profissional.",
      en: "Register a payer with its withholding and how it affects the professional's payout.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Los convenios (obras sociales, financiadores) se cadastran en Administración, en la pestaña Convenios. Se vinculan al paciente desde su ficha.",
          pt: "Os convênios (obras sociais, financiadores) são cadastrados em Administração, na aba Convênios. São vinculados ao paciente na ficha dele.",
          en: "Insurers (health plans, payers) are registered under Administration, in the Insurers tab. They're linked to the patient from their chart.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Crea el convenio con su nombre, tipo y el porcentaje de retención, si aplica.",
            pt: "Crie o convênio com nome, tipo e o percentual de retención, se aplicável.",
            en: "Create the insurer with its name, type and withholding percentage, if applicable.",
          },
          {
            es: "Vincula el convenio al paciente en su ficha.",
            pt: "Vincule o convênio ao paciente na ficha dele.",
            en: "Link the insurer to the patient in their chart.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Al liquidar a un profesional, si el paciente tiene un convenio con retención (habitual en Argentina), esa retención reduce la producción antes de aplicar la comisión.",
          pt: "Ao liquidar um profissional, se o paciente tem um convênio com retención (comum na Argentina), essa retención reduz a produção antes de aplicar a comissão.",
          en: "When paying out a professional, if the patient has an insurer with withholding (common in Argentina), that withholding reduces production before applying the commission.",
        },
      },
    ],
  },

  // TÓTEM
  {
    slug: "totem-por-pais",
    categoryId: "totem",
    updated: "2026-05-16",
    readingMinutes: 3,
    keywords: ["totem", "documento", "rut", "cpf", "dni", "curp", "teclado", "pais"],
    related: ["check-in-en-el-totem"],
    title: {
      es: "El tótem por país: RUT, CPF, DNI y más",
      pt: "O totem por país: RUT, CPF, DNI e mais",
      en: "The kiosk by country: RUT, CPF, DNI and more",
    },
    excerpt: {
      es: "El teclado del tótem se adapta al documento de identidad de tu país.",
      pt: "O teclado do totem se adapta ao documento de identidade do seu país.",
      en: "The kiosk keypad adapts to your country's identity document.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El check-in del tótem identifica al paciente por su documento, y el teclado cambia según el país de tu clínica.",
          pt: "O check-in do totem identifica o paciente pelo documento, e o teclado muda conforme o país da sua clínica.",
          en: "The kiosk check-in identifies the patient by their document, and the keypad changes according to your clinic's country.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Chile (RUT): teclado numérico con tecla K, formato automático y validación del dígito verificador.",
            pt: "Chile (RUT): teclado numérico com tecla K, formato automático e validação do dígito verificador.",
            en: "Chile (RUT): numeric keypad with a K key, auto formatting and check-digit validation.",
          },
          {
            es: "CPF (Brasil), DNI (Argentina/Perú), Cédula (Colombia): teclado numérico simple.",
            pt: "CPF (Brasil), DNI (Argentina/Peru), Cédula (Colômbia): teclado numérico simples.",
            en: "CPF (Brazil), DNI (Argentina/Peru), Cédula (Colombia): plain numeric keypad.",
          },
          {
            es: "CURP (México), NIE/DNI (España): teclado alfanumérico.",
            pt: "CURP (México), NIE/DNI (Espanha): teclado alfanumérico.",
            en: "CURP (Mexico), NIE/DNI (Spain): alphanumeric keypad.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El sistema reconoce el documento aunque esté guardado con o sin puntos y guiones, así que el paciente puede escribirlo como prefiera.",
          pt: "O sistema reconhece o documento mesmo que esteja salvo com ou sem pontos e traços, então o paciente pode digitá-lo como preferir.",
          en: "The system recognizes the document whether it's stored with or without dots and dashes, so the patient can type it however they like.",
        },
      },
    ],
  },

  // CUENTA Y SEGURIDAD
  {
    slug: "acceso-a-modulos",
    categoryId: "cuenta",
    updated: "2026-05-18",
    readingMinutes: 4,
    keywords: ["modulos", "permisos", "acceso", "granular", "plan", "rol", "candado"],
    related: ["usuarios-y-roles", "tu-plan-y-cuotas"],
    title: {
      es: "Ajustar el acceso a módulos de un usuario",
      pt: "Ajustar o acesso a módulos de um usuário",
      en: "Adjust a user's module access",
    },
    excerpt: {
      es: "Cada usuario ve solo lo que necesita. Afina el acceso módulo por módulo.",
      pt: "Cada usuário vê só o que precisa. Ajuste o acesso módulo por módulo.",
      en: "Each user sees only what they need. Fine-tune access module by module.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Desde el perfil de un usuario (Administración → Profesionales) puedes activar o desactivar el acceso a cada módulo, más allá de lo que trae su rol.",
          pt: "No perfil de um usuário (Administração → Profissionais) você pode ativar ou desativar o acesso a cada módulo, além do que o papel dele traz.",
          en: "From a user's profile (Administration → Professionals) you can turn each module's access on or off, beyond what their role brings.",
        },
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Hay dos tipos de candado distintos: un módulo puede estar bloqueado por tu plan (lo desbloquea un upgrade) o gobernado por el rol (como Configuraciones o Administración). Ajustar módulos nunca cambia el rol ni lo que pagas.",
          pt: "Há dois tipos de cadeado distintos: um módulo pode estar bloqueado pelo seu plano (um upgrade desbloqueia) ou governado pelo papel (como Configurações ou Administração). Ajustar módulos nunca muda o papel nem o que você paga.",
          en: "There are two different locks: a module can be blocked by your plan (an upgrade unlocks it) or governed by the role (like Settings or Administration). Adjusting modules never changes the role or what you pay.",
        },
      },
    ],
  },
  {
    slug: "tu-plan-y-cuotas",
    categoryId: "cuenta",
    updated: "2026-06-01",
    readingMinutes: 4,
    keywords: ["plan", "suscripcion", "cuota", "cuotas ia", "upgrade", "fundador", "corporativo"],
    related: ["acceso-a-modulos"],
    title: {
      es: "Tu plan, tus cuotas de IA y el upgrade",
      pt: "Seu plano, suas cotas de IA e o upgrade",
      en: "Your plan, your AI quotas and upgrading",
    },
    excerpt: {
      es: "Consulta tu plan actual, cuánto usaste de IA y cómo subir de nivel.",
      pt: "Veja seu plano atual, quanto usou de IA e como subir de nível.",
      en: "Check your current plan, how much AI you've used and how to upgrade.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "En «Mi plan» ves tu suscripción actual, los límites (profesionales, almacenamiento) y el uso de tus cuotas de IA con barras de progreso.",
          pt: "Em «Meu plano» você vê a assinatura atual, os limites (profissionais, armazenamento) e o uso das cotas de IA com barras de progresso.",
          en: "In “My plan” you see your current subscription, the limits (professionals, storage) and your AI quota usage with progress bars.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Planes: Esencial, Profesional, Avanzado y Corporativo (este último, a medida).",
            pt: "Planos: Essencial, Profissional, Avançado e Corporativo (este último, sob medida).",
            en: "Plans: Essential, Professional, Advanced and Corporate (the last one, tailored).",
          },
          {
            es: "Cuotas de IA: simulaciones de sonrisa, informes de radiografía y WhatsApp.",
            pt: "Cotas de IA: simulações de sorriso, laudos de radiografia e WhatsApp.",
            en: "AI quotas: smile simulations, radiograph reports and WhatsApp.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Para cambiar de plan, la opción de upgrade te pone en contacto con nuestro equipo. Si eres de los primeros clientes, puedes tener el Plan Fundador con descuento vitalicio.",
          pt: "Para mudar de plano, a opção de upgrade coloca você em contato com nosso time. Se você é dos primeiros clientes, pode ter o Plano Fundador com desconto vitalício.",
          en: "To change plans, the upgrade option puts you in touch with our team. If you're an early customer, you may have the Founder Plan with a lifetime discount.",
        },
      },
    ],
  },
  {
    slug: "vision-de-red",
    categoryId: "cuenta",
    updated: "2026-06-04",
    readingMinutes: 3,
    keywords: ["red", "network", "multi clinica", "sucursal", "dashboard", "cambiar clinica"],
    related: ["usuarios-y-roles"],
    title: {
      es: "Visión de Red: varias clínicas en un panel",
      pt: "Visão de Rede: várias clínicas num painel",
      en: "Network view: several clinics in one panel",
    },
    excerpt: {
      es: "Si tienes una red de clínicas, mira sus indicadores consolidados y cambia entre ellas.",
      pt: "Se você tem uma rede de clínicas, veja os indicadores consolidados e alterne entre elas.",
      en: "If you have a network of clinics, view their consolidated metrics and switch between them.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "La Visión de Red aparece para quienes administran más de una clínica. Muestra un dashboard con los indicadores agregados de toda la red.",
          pt: "A Visão de Rede aparece para quem administra mais de uma clínica. Mostra um dashboard com os indicadores agregados de toda a rede.",
          en: "The Network view appears for those who manage more than one clinic. It shows a dashboard with the network's aggregated metrics.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Ves totales de pacientes, citas y facturación por clínica y de la red completa.",
            pt: "Você vê totais de pacientes, consultas e faturamento por clínica e da rede completa.",
            en: "You see totals of patients, appointments and revenue per clinic and for the whole network.",
          },
          {
            es: "Si perteneces a varias clínicas, cambias de una a otra con un clic.",
            pt: "Se você pertence a várias clínicas, muda de uma para outra com um clique.",
            en: "If you belong to several clinics, you switch from one to another with a click.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Por privacidad de los pacientes, la vista de red muestra indicadores, no fichas clínicas: para abrir una ficha entras a la clínica correspondiente.",
          pt: "Por privacidade dos pacientes, a visão de rede mostra indicadores, não fichas clínicas: para abrir uma ficha você entra na clínica correspondente.",
          en: "For patient privacy, the network view shows metrics, not clinical charts: to open a chart you enter the corresponding clinic.",
        },
      },
    ],
  },
  {
    slug: "verificacion-en-dos-pasos",
    categoryId: "cuenta",
    updated: "2026-06-04",
    readingMinutes: 3,
    keywords: ["2fa", "seguridad", "verificacion", "dos pasos", "totp", "privacidad", "datos"],
    related: ["usuarios-y-roles"],
    title: {
      es: "Verificación en dos pasos y seguridad de tus datos",
      pt: "Verificação em duas etapas e segurança dos seus dados",
      en: "Two-factor authentication and your data's security",
    },
    excerpt: {
      es: "Protege tu cuenta con 2FA y entiende cómo cuidamos la información de tu clínica.",
      pt: "Proteja sua conta com 2FA e entenda como cuidamos da informação da sua clínica.",
      en: "Protect your account with 2FA and understand how we look after your clinic's data.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Cada usuario puede activar la verificación en dos pasos (2FA) para agregar una capa extra a su inicio de sesión, con una app de autenticación.",
          pt: "Cada usuário pode ativar a verificação em duas etapas (2FA) para adicionar uma camada extra ao login, com um app de autenticação.",
          en: "Each user can enable two-factor authentication (2FA) to add an extra layer to their sign-in, using an authenticator app.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Los datos de cada clínica están aislados: nadie de otra clínica accede a los tuyos.",
            pt: "Os dados de cada clínica são isolados: ninguém de outra clínica acessa os seus.",
            en: "Each clinic's data is isolated: no one from another clinic can access yours.",
          },
          {
            es: "Las evoluciones clínicas son inmutables por ley, y las acciones importantes quedan registradas con autor y fecha.",
            pt: "As evoluções clínicas são imutáveis por lei, e as ações importantes ficam registradas com autor e data.",
            en: "Clinical evolutions are immutable by law, and important actions are logged with author and date.",
          },
        ],
      },
    ],
  },

  // ─── Ola 3 ───

  // CRM Y CAMPAÑAS
  {
    slug: "que-es-el-crm",
    categoryId: "crm",
    updated: "2026-05-02",
    readingMinutes: 4,
    keywords: ["crm", "tareas", "seguimiento", "ia", "inbox", "bandeja", "pacientes"],
    related: ["crm-inbox", "crm-plantillas"],
    title: {
      es: "Qué es el CRM y de dónde salen las tareas",
      pt: "O que é o CRM e de onde saem as tarefas",
      en: "What the CRM is and where tasks come from",
    },
    excerpt: {
      es: "Una bandeja de tareas de seguimiento a tus pacientes, generadas por IA o creadas por tu equipo.",
      pt: "Uma bandeja de tarefas de acompanhamento aos seus pacientes, geradas por IA ou criadas pela equipe.",
      en: "A queue of patient follow-up tasks, generated by AI or created by your team.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El CRM (menú CRM) no es un chat de mensajes: es una bandeja de tareas de seguimiento a pacientes que ya están en tu clínica. Cada tarea es un contacto por hacer (recordar un control, ofrecer un tratamiento, etc.).",
          pt: "O CRM (menu CRM) não é um chat de mensagens: é uma bandeja de tarefas de acompanhamento a pacientes que já estão na sua clínica. Cada tarefa é um contato a fazer (lembrar um controle, oferecer um tratamento, etc.).",
          en: "The CRM (CRM menu) isn't a message chat: it's a queue of follow-up tasks for patients already in your clinic. Each task is a touch to make (remind a check-up, offer a treatment, etc.).",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Las tareas nacen de la IA (el Resumen IA del paciente detecta oportunidades) o las creas tú a mano.",
            pt: "As tarefas nascem da IA (o Resumo IA do paciente detecta oportunidades) ou você as cria à mão.",
            en: "Tasks come from the AI (the patient's AI Summary spots opportunities) or you create them by hand.",
          },
          {
            es: "También puedes generarlas en lote con una campaña por segmento.",
            pt: "Você também pode gerá-las em lote com uma campanha por segmento.",
            en: "You can also generate them in bulk with a segmented campaign.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El CRM es una función de los planes superiores. Si no ves el menú, tu plan aún no lo incluye.",
          pt: "O CRM é uma função dos planos superiores. Se você não vê o menu, seu plano ainda não o inclui.",
          en: "The CRM is a feature of higher plans. If you don't see the menu, your plan doesn't include it yet.",
        },
      },
    ],
  },
  {
    slug: "crm-inbox",
    categoryId: "crm",
    updated: "2026-05-02",
    readingMinutes: 4,
    keywords: ["inbox", "bandeja", "tarea", "enviar", "whatsapp", "email", "filtro"],
    related: ["que-es-el-crm", "crm-plantillas"],
    title: {
      es: "La bandeja del CRM: filtrar y enviar tareas",
      pt: "A bandeja do CRM: filtrar e enviar tarefas",
      en: "The CRM inbox: filter and send tasks",
    },
    excerpt: {
      es: "Filtra por estado, tema o canal, y envía cada tarea por WhatsApp o email.",
      pt: "Filtre por estado, tema ou canal, e envie cada tarefa por WhatsApp ou e-mail.",
      en: "Filter by status, topic or channel, and send each task by WhatsApp or email.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "La bandeja (Inbox) muestra todas las tareas con contadores por estado: pendientes, agendadas, enviadas y respondidas. Puedes filtrar por tema, canal y origen (IA o manual).",
          pt: "A bandeja (Inbox) mostra todas as tarefas com contadores por estado: pendentes, agendadas, enviadas e respondidas. Você pode filtrar por tema, canal e origem (IA ou manual).",
          en: "The inbox shows all tasks with counters by status: pending, scheduled, sent and replied. You can filter by topic, channel and origin (AI or manual).",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Abre una tarea para ver el detalle y un borrador de mensaje editable.",
            pt: "Abra uma tarefa para ver o detalhe e um rascunho de mensagem editável.",
            en: "Open a task to see the detail and an editable message draft.",
          },
          {
            es: "Pulsa «Enviar ahora» para mandarla por WhatsApp o email; revisa el texto antes de enviar.",
            pt: "Clique em «Enviar agora» para mandá-la por WhatsApp ou e-mail; revise o texto antes de enviar.",
            en: "Click “Send now” to send it by WhatsApp or email; review the text before sending.",
          },
          {
            es: "Con «Nueva tarea» creas una a mano: eliges paciente, canal, tema y prioridad.",
            pt: "Com «Nova tarefa» você cria uma à mão: escolhe paciente, canal, tema e prioridade.",
            en: "With “New task” you create one by hand: choose patient, channel, topic and priority.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Cuando el paciente responde por WhatsApp, la tarea se marca sola como respondida. Enviar por WhatsApp exige tener a Sofía conectada; por email, el correo de la clínica configurado.",
          pt: "Quando o paciente responde no WhatsApp, a tarefa se marca sozinha como respondida. Enviar por WhatsApp exige a Sofía conectada; por e-mail, o correio da clínica configurado.",
          en: "When the patient replies on WhatsApp, the task marks itself as replied. Sending by WhatsApp requires Sofía connected; by email, the clinic's mail set up.",
        },
      },
    ],
  },
  {
    slug: "crm-plantillas",
    categoryId: "crm",
    updated: "2026-05-02",
    readingMinutes: 3,
    keywords: ["plantilla", "template", "variable", "global", "duplicar", "mensaje"],
    related: ["crm-inbox", "crm-campanas"],
    title: {
      es: "Plantillas de mensajes del CRM",
      pt: "Modelos de mensagem do CRM",
      en: "CRM message templates",
    },
    excerpt: {
      es: "Reutiliza mensajes con variables como {{paciente_primeiro_nome}}.",
      pt: "Reutilize mensagens com variáveis como {{paciente_primeiro_nome}}.",
      en: "Reuse messages with variables like {{paciente_primeiro_nome}}.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Las plantillas te ahorran escribir lo mismo cada vez. Hay plantillas globales (listas para usar) y las que crea tu clínica.",
          pt: "Os modelos poupam escrever a mesma coisa toda vez. Há modelos globais (prontos para usar) e os que sua clínica cria.",
          en: "Templates save you from writing the same thing every time. There are global templates (ready to use) and the ones your clinic creates.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Una plantilla global no se edita: la duplicas para tener tu versión, o la ocultas si no la usas.",
            pt: "Um modelo global não se edita: você o duplica para ter sua versão, ou o oculta se não usa.",
            en: "A global template can't be edited: duplicate it to get your own version, or hide it if you don't use it.",
          },
          {
            es: "Usa variables entre llaves ({{clinica_nome}}, {{plano_titulo}}…) y previsualiza con datos de ejemplo.",
            pt: "Use variáveis entre chaves ({{clinica_nome}}, {{plano_titulo}}…) e pré-visualize com dados de exemplo.",
            en: "Use variables in braces ({{clinica_nome}}, {{plano_titulo}}…) and preview with sample data.",
          },
        ],
      },
    ],
  },
  {
    slug: "crm-campanas",
    categoryId: "crm",
    updated: "2026-05-02",
    readingMinutes: 4,
    keywords: ["campana", "campaña", "segmento", "tags", "lote", "envio masivo"],
    related: ["crm-inbox", "crm-plantillas"],
    title: {
      es: "Campañas: llegar a un segmento en lote",
      pt: "Campanhas: alcançar um segmento em lote",
      en: "Campaigns: reach a segment in bulk",
    },
    excerpt: {
      es: "Genera tareas para muchos pacientes a la vez, filtrando por etiquetas de IA.",
      pt: "Gere tarefas para muitos pacientes de uma vez, filtrando por etiquetas de IA.",
      en: "Generate tasks for many patients at once, filtering by AI tags.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Una campaña crea tareas para un grupo de pacientes usando una plantilla. Defines la audiencia con filtros inteligentes.",
          pt: "Uma campanha cria tarefas para um grupo de pacientes usando um modelo. Você define a audiência com filtros inteligentes.",
          en: "A campaign creates tasks for a group of patients using a template. You define the audience with smart filters.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "En Campañas, pulsa «Nueva campaña», ponle nombre y elige la plantilla.",
            pt: "Em Campanhas, clique em «Nova campanha», dê um nome e escolha o modelo.",
            en: "In Campaigns, click “New campaign”, name it and choose the template.",
          },
          {
            es: "Segmenta por etiquetas de IA (riesgo de abandono, interés estético, VIP…), por última visita o por membresía.",
            pt: "Segmente por etiquetas de IA (risco de abandono, interesse estético, VIP…), por última visita ou por mensalidade.",
            en: "Segment by AI tags (churn risk, aesthetic interest, VIP…), by last visit or by membership.",
          },
          {
            es: "Ejecuta: confirmas el total y se crean las tareas en lote para revisar y enviar.",
            pt: "Execute: você confirma o total e as tarefas são criadas em lote para revisar e enviar.",
            en: "Run it: you confirm the total and the tasks are created in bulk to review and send.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Puedes excluir a quienes ya recibieron un mensaje del mismo tema hace pocos días, para no saturar.",
          pt: "Você pode excluir quem já recebeu uma mensagem do mesmo tema há poucos dias, para não saturar.",
          en: "You can exclude those who already got a message on the same topic a few days ago, to avoid over-contacting.",
        },
      },
    ],
  },
  {
    slug: "crm-reportes",
    categoryId: "crm",
    updated: "2026-05-02",
    readingMinutes: 3,
    keywords: ["reportes", "crm", "tasa de respuesta", "canales", "metricas crm"],
    related: ["crm-inbox"],
    title: {
      es: "Reportes del CRM",
      pt: "Relatórios do CRM",
      en: "CRM reports",
    },
    excerpt: {
      es: "Mide cuántas tareas se envían y cuántas responden tus pacientes.",
      pt: "Meça quantas tarefas são enviadas e quantas seus pacientes respondem.",
      en: "Measure how many tasks are sent and how many patients reply.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "La pestaña Reportes muestra el rendimiento del CRM en el período que elijas: tareas generadas, enviadas, respondidas y la tasa de respuesta.",
          pt: "A aba Relatórios mostra o desempenho do CRM no período que você escolher: tarefas geradas, enviadas, respondidas e a taxa de resposta.",
          en: "The Reports tab shows the CRM's performance for the period you pick: tasks generated, sent, replied and the reply rate.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Ves los temas más usados, el reparto por canal (WhatsApp, email, manual) y IA vs. manual.",
            pt: "Você vê os temas mais usados, a divisão por canal (WhatsApp, e-mail, manual) e IA vs. manual.",
            en: "You see the most-used topics, the split by channel (WhatsApp, email, manual) and AI vs. manual.",
          },
        ],
      },
    ],
  },

  // INFORMES Y MÉTRICAS
  {
    slug: "panel-inicial",
    categoryId: "informes",
    updated: "2026-05-15",
    readingMinutes: 4,
    featured: true,
    keywords: ["dashboard", "panel", "inicio", "kpi", "indicadores", "agenda del dia"],
    related: ["informes-de-gestion", "mi-desempeno"],
    title: {
      es: "El panel inicial (Dashboard)",
      pt: "O painel inicial (Dashboard)",
      en: "The home dashboard",
    },
    excerpt: {
      es: "Lo que ves al entrar: los números del día y el acceso rápido a todo.",
      pt: "O que você vê ao entrar: os números do dia e o acesso rápido a tudo.",
      en: "What you see on entering: the day's numbers and quick access to everything.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El panel inicial es la primera pantalla al entrar. Reúne los indicadores clave y la agenda del día.",
          pt: "O painel inicial é a primeira tela ao entrar. Reúne os indicadores-chave e a agenda do dia.",
          en: "The home dashboard is the first screen you see. It gathers the key indicators and the day's agenda.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Cuatro indicadores: consultas de hoy, pacientes activos, comparecimiento (30 días) y facturación del mes.",
            pt: "Quatro indicadores: consultas de hoje, pacientes ativos, comparecimento (30 dias) e faturamento do mês.",
            en: "Four indicators: today's appointments, active patients, attendance (30 days) and the month's revenue.",
          },
          {
            es: "La agenda del día, la búsqueda rápida de pacientes y un acceso rápido a los módulos.",
            pt: "A agenda do dia, a busca rápida de pacientes e um acesso rápido aos módulos.",
            en: "The day's agenda, quick patient search and quick access to the modules.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El panel es fijo (hoy + 30 días + mes actual). Para análisis por período y gráficos, usa Informes.",
          pt: "O painel é fixo (hoje + 30 dias + mês atual). Para análise por período e gráficos, use Relatórios.",
          en: "The dashboard is fixed (today + 30 days + current month). For period analysis and charts, use Reports.",
        },
      },
    ],
  },
  {
    slug: "informes-de-gestion",
    categoryId: "informes",
    updated: "2026-06-05",
    readingMinutes: 5,
    keywords: ["informes", "relatorios", "reportes", "bi", "conversion", "ocupacion", "periodo"],
    related: ["panel-inicial", "mi-desempeno"],
    title: {
      es: "Los informes de gestión",
      pt: "Os relatórios de gestão",
      en: "Management reports",
    },
    excerpt: {
      es: "Un panel de BI con doce vistas: facturación, agenda, conversión, ocupación y más.",
      pt: "Um painel de BI com doze vistas: faturamento, agenda, conversão, ocupação e mais.",
      en: "A BI panel with twelve views: revenue, agenda, conversion, occupancy and more.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El menú Informes reúne la analítica de gestión de la clínica en varias pestañas, con un filtro de período (7, 30, 90 días o 1 año).",
          pt: "O menu Relatórios reúne a analítica de gestão da clínica em várias abas, com um filtro de período (7, 30, 90 dias ou 1 ano).",
          en: "The Reports menu gathers the clinic's management analytics in several tabs, with a period filter (7, 30, 90 days or 1 year).",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Facturación, agenda (comparecimiento, cancelaciones, horarios pico), pacientes y funnel de conversión.",
            pt: "Faturamento, agenda (comparecimento, cancelamentos, horários de pico), pacientes e funil de conversão.",
            en: "Revenue, agenda (attendance, cancellations, peak hours), patients and conversion funnel.",
          },
          {
            es: "Ocupación de boxes, primera consulta, memberships (MRR, churn), gastos e inadimplencia.",
            pt: "Ocupação de boxes, primeira consulta, mensalidades (MRR, churn), gastos e inadimplência.",
            en: "Chair occupancy, first visit, memberships (MRR, churn), expenses and overdue payments.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Los informes son para administradores y requieren un plan que incluya BI. Si no ves el menú, es por tu perfil o tu plan.",
          pt: "Os relatórios são para administradores e exigem um plano com BI. Se você não vê o menu, é pelo seu perfil ou plano.",
          en: "Reports are for administrators and require a plan that includes BI. If you don't see the menu, it's due to your role or plan.",
        },
      },
    ],
  },
  {
    slug: "mi-desempeno",
    categoryId: "informes",
    updated: "2026-06-15",
    readingMinutes: 4,
    keywords: ["mi desempeno", "meu desempenho", "dentista", "produccion", "comision", "ganancias"],
    related: ["panel-inicial", "liquidaciones-profesionales"],
    title: {
      es: "Mi desempeño: el panel del dentista",
      pt: "Meu desempenho: o painel do dentista",
      en: "My performance: the dentist's panel",
    },
    excerpt: {
      es: "Cada dentista ve su producción, su comisión y sus ganancias del período.",
      pt: "Cada dentista vê sua produção, sua comissão e seus ganhos do período.",
      en: "Each dentist sees their production, commission and earnings for the period.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Mi desempeño es el panel personal del dentista. Siempre muestra tus propios números, nunca los de un colega.",
          pt: "Meu desempenho é o painel pessoal do dentista. Sempre mostra os seus próprios números, nunca os de um colega.",
          en: "My performance is the dentist's personal panel. It always shows your own numbers, never a colleague's.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Tu tasa de cierre de la primera consulta, producción, ticket medio y tiempo de decisión.",
            pt: "Sua taxa de fechamento da primeira consulta, produção, ticket médio e tempo de decisão.",
            en: "Your first-visit close rate, production, average ticket and decision time.",
          },
          {
            es: "Tu comisión (global y por especialidad) y tus ganancias del período, con recibo en PDF.",
            pt: "Sua comissão (global e por especialidade) e seus ganhos do período, com recibo em PDF.",
            en: "Your commission (global and by specialty) and your earnings for the period, with a PDF receipt.",
          },
          {
            es: "Tus planes pendientes: propuestas presentadas que aún esperan respuesta.",
            pt: "Seus planos pendentes: propostas apresentadas que ainda esperam resposta.",
            en: "Your pending plans: presented proposals still awaiting a reply.",
          },
        ],
      },
    ],
  },

  // INVENTARIO Y LABORATORIO
  {
    slug: "control-de-stock",
    categoryId: "inventario",
    updated: "2026-05-10",
    readingMinutes: 4,
    keywords: ["estoque", "stock", "inventario", "item", "minimo", "alerta", "movimiento"],
    related: ["ordenes-de-laboratorio"],
    title: {
      es: "Control de stock: items, mínimos y alertas",
      pt: "Controle de estoque: itens, mínimos e alertas",
      en: "Stock control: items, minimums and alerts",
    },
    excerpt: {
      es: "Registra tus insumos, define mínimos y recibe aviso cuando algo está por acabarse.",
      pt: "Registre seus insumos, defina mínimos e receba aviso quando algo está acabando.",
      en: "Register your supplies, set minimums and get alerted when something is running low.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "El control de stock lleva tus insumos (materiales, medicamentos, instrumentos, EPP). Se accede por la dirección /estoque.",
          pt: "O controle de estoque acompanha seus insumos (materiais, medicamentos, instrumentos, EPI). Acessa-se pelo endereço /estoque.",
          en: "Stock control tracks your supplies (materials, medications, instruments, PPE). It's accessed at the /estoque address.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Crea un item con su nombre, categoría, unidad, cantidad actual y cantidad mínima.",
            pt: "Crie um item com nome, categoria, unidade, quantidade atual e quantidade mínima.",
            en: "Create an item with its name, category, unit, current quantity and minimum quantity.",
          },
          {
            es: "Registra movimientos: entrada, salida o ajuste. La cantidad solo cambia por movimientos.",
            pt: "Registre movimentos: entrada, saída ou ajuste. A quantidade só muda por movimentos.",
            en: "Record movements: in, out or adjustment. The quantity only changes through movements.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        text: {
          es: "Cuando un item baja de su mínimo, aparece un aviso de stock bajo. El control es manual: no se descuenta solo al usar material en una consulta.",
          pt: "Quando um item fica abaixo do mínimo, aparece um aviso de estoque baixo. O controle é manual: não baixa sozinho ao usar material numa consulta.",
          en: "When an item drops below its minimum, a low-stock warning appears. Control is manual: it isn't deducted automatically when material is used in a visit.",
        },
      },
    ],
  },
  {
    slug: "cadastro-laboratorios",
    categoryId: "inventario",
    updated: "2026-05-20",
    readingMinutes: 4,
    keywords: ["laboratorio", "lab", "servicio", "precio", "margen", "costo"],
    related: ["ordenes-de-laboratorio", "portal-laboratorio"],
    title: {
      es: "Registrar laboratorios y sus servicios",
      pt: "Cadastrar laboratórios e seus serviços",
      en: "Register labs and their services",
    },
    excerpt: {
      es: "Da de alta tus laboratorios con sus servicios, costo y precio, y ve el margen.",
      pt: "Cadastre seus laboratórios com serviços, custo e preço, e veja a margem.",
      en: "Register your labs with their services, cost and price, and see the margin.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Los laboratorios se registran en Administración → Laboratorio. Cada uno puede tener sus servicios con dos precios.",
          pt: "Os laboratórios são cadastrados em Administração → Laboratório. Cada um pode ter seus serviços com dois preços.",
          en: "Labs are registered under Administration → Lab. Each one can have its services with two prices.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Da de alta el laboratorio (nombre, contacto, email).",
            pt: "Cadastre o laboratório (nome, contato, e-mail).",
            en: "Register the lab (name, contact, email).",
          },
          {
            es: "Agrega sus servicios con el costo del lab y el precio a la clínica. El sistema te muestra el margen.",
            pt: "Adicione seus serviços com o custo do lab e o preço para a clínica. O sistema mostra a margem.",
            en: "Add its services with the lab's cost and the price to the clinic. The system shows you the margin.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Registrar o editar laboratorios es cosa de administradores. El costo, el precio y el margen nunca los ve el laboratorio externo.",
          pt: "Cadastrar ou editar laboratórios é coisa de administradores. O custo, o preço e a margem nunca são vistos pelo laboratório externo.",
          en: "Registering or editing labs is for administrators. The cost, price and margin are never seen by the external lab.",
        },
      },
    ],
  },
  {
    slug: "ordenes-de-laboratorio",
    categoryId: "inventario",
    updated: "2026-05-20",
    readingMinutes: 4,
    keywords: ["orden", "laboratorio", "protesis", "status", "imprimir", "email", "comentario"],
    related: ["cadastro-laboratorios", "portal-laboratorio"],
    title: {
      es: "Órdenes de laboratorio",
      pt: "Ordens de laboratório",
      en: "Lab orders",
    },
    excerpt: {
      es: "Crea una orden de trabajo, sigue su estado, imprímela o envíala por email al lab.",
      pt: "Crie uma ordem de trabalho, acompanhe o status, imprima ou envie por e-mail ao lab.",
      en: "Create a work order, track its status, print it or email it to the lab.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Las órdenes de laboratorio se crean en Administración → Laboratorio → Órdenes. Cada orden va ligada a un paciente.",
          pt: "As ordens de laboratório são criadas em Administração → Laboratório → Ordens. Cada ordem fica ligada a um paciente.",
          en: "Lab orders are created under Administration → Lab → Orders. Each order is linked to a patient.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Elige el paciente y el laboratorio (o escribe uno libre), el servicio, el material y el color (Vita).",
            pt: "Escolha o paciente e o laboratório (ou escreva um livre), o serviço, o material e a cor (Vita).",
            en: "Choose the patient and the lab (or type a free one), the service, the material and the color (Vita).",
          },
          {
            es: "Sigue el estado: enviado, en producción, listo, entregado. Al cambiarlo, se avisa al dentista por email.",
            pt: "Acompanhe o status: enviado, em produção, pronto, entregue. Ao mudá-lo, avisa-se o dentista por e-mail.",
            en: "Track the status: sent, in production, ready, delivered. When it changes, the dentist is notified by email.",
          },
          {
            es: "Imprime la orden de trabajo o envíala por email al laboratorio, y conversa por los comentarios.",
            pt: "Imprima a ordem de trabalho ou envie por e-mail ao laboratório, e converse pelos comentários.",
            en: "Print the work order or email it to the lab, and chat through the comments.",
          },
        ],
      },
    ],
  },
  {
    slug: "portal-laboratorio",
    categoryId: "inventario",
    updated: "2026-05-20",
    readingMinutes: 3,
    keywords: ["portal", "laboratorio externo", "status", "comentario", "acceso lab"],
    related: ["ordenes-de-laboratorio"],
    title: {
      es: "Portal del laboratorio externo",
      pt: "Portal do laboratório externo",
      en: "External lab portal",
    },
    excerpt: {
      es: "El laboratorio entra en su propio portal, ve solo sus órdenes y actualiza el estado.",
      pt: "O laboratório entra no próprio portal, vê só as suas ordens e atualiza o status.",
      en: "The lab logs into its own portal, sees only its orders and updates the status.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Si tu laboratorio es externo, puede tener un acceso propio (rol laboratorio) que abre solo su portal.",
          pt: "Se seu laboratório é externo, pode ter um acesso próprio (papel laboratório) que abre só o portal dele.",
          en: "If your lab is external, it can have its own login (lab role) that opens only its portal.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "El lab ve únicamente sus propias órdenes: paciente, servicio, material, color y comentarios.",
            pt: "O lab vê apenas as próprias ordens: paciente, serviço, material, cor e comentários.",
            en: "The lab sees only its own orders: patient, service, material, color and comments.",
          },
          {
            es: "Puede mover el estado a «en producción» o «listo», y responder por los comentarios. Nunca ve costos ni precios.",
            pt: "Pode mover o status para «em produção» ou «pronto», e responder pelos comentários. Nunca vê custos nem preços.",
            en: "It can move the status to “in production” or “ready”, and reply through comments. It never sees costs or prices.",
          },
        ],
      },
    ],
  },

  // PRIMEROS PASOS (Ola 3)
  {
    slug: "catalogo-de-procedimientos",
    categoryId: "primeros-pasos",
    updated: "2026-05-08",
    readingMinutes: 4,
    keywords: ["procedimiento", "arancel", "catalogo", "precio", "uco", "categoria"],
    related: ["configurar-tu-clinica", "crear-plan-tratamiento"],
    title: {
      es: "El catálogo de procedimientos (aranceles)",
      pt: "O catálogo de procedimentos (tabela de preços)",
      en: "The procedures catalog (price list)",
    },
    excerpt: {
      es: "Arma tu lista de procedimientos con precios: importa del catálogo global o crea los tuyos.",
      pt: "Monte sua lista de procedimentos com preços: importe do catálogo global ou crie os seus.",
      en: "Build your procedures list with prices: import from the global catalog or create your own.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Los procedimientos son la base de los planes de tratamiento y los cobros. Se gestionan en Administración → Procedimientos.",
          pt: "Os procedimentos são a base dos planos de tratamento e das cobranças. São geridos em Administração → Procedimentos.",
          en: "Procedures are the basis of treatment plans and payments. They're managed under Administration → Procedures.",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Importa procedimientos del catálogo global (traen un precio de referencia) o crea uno personalizado.",
            pt: "Importe procedimentos do catálogo global (trazem um preço de referência) ou crie um personalizado.",
            en: "Import procedures from the global catalog (they bring a reference price) or create a custom one.",
          },
          {
            es: "Para cada uno defines precio, duración, categoría y la categoría de recibo (clínico, examen, promoción).",
            pt: "Para cada um você define preço, duração, categoria e a categoria de recibo (clínico, exame, promoção).",
            en: "For each one you set price, duration, category and the receipt category (clinical, exam, promotion).",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El campo UCO (Unidad de valorización) solo aparece en clínicas de Chile (moneda CLP). Solo puedes eliminar los procedimientos personalizados; los del catálogo se desactivan.",
          pt: "O campo UCO (Unidad de valorización) só aparece em clínicas do Chile (moeda CLP). Você só pode excluir os procedimentos personalizados; os do catálogo se desativam.",
          en: "The UCO field (valuation unit) only appears in Chile-based clinics (CLP currency). You can only delete custom procedures; catalog ones are deactivated.",
        },
      },
    ],
  },
  {
    slug: "buscar-y-crear-paciente",
    categoryId: "primeros-pasos",
    updated: "2026-06-01",
    readingMinutes: 4,
    keywords: ["paciente", "buscar", "crear", "registrar", "documento", "prontuario"],
    related: ["configurar-tu-clinica", "marcar-el-odontograma"],
    title: {
      es: "Buscar y crear un paciente",
      pt: "Buscar e criar um paciente",
      en: "Find and create a patient",
    },
    excerpt: {
      es: "Busca en tu base y da de alta a un paciente nuevo; su ficha se crea sola.",
      pt: "Busque na sua base e cadastre um paciente novo; a ficha dele é criada sozinha.",
      en: "Search your base and register a new patient; their chart is created automatically.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "En el menú Pacientes buscas por nombre, email o teléfono, y filtras por chips (atrasados, hoy, con membresía, etc.).",
          pt: "No menu Pacientes você busca por nome, e-mail ou telefone, e filtra por chips (atrasados, hoje, com mensalidade, etc.).",
          en: "In the Patients menu you search by name, email or phone, and filter by chips (overdue, today, with membership, etc.).",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Pulsa «Nuevo paciente». Lo único obligatorio es el nombre.",
            pt: "Clique em «Novo paciente». O único obrigatório é o nome.",
            en: "Click “New patient”. The only required field is the name.",
          },
          {
            es: "Los campos de documento y previsión se adaptan a tu país. Guarda y abre el prontuario, o guarda y agenda una cita.",
            pt: "Os campos de documento e previsão se adaptam ao seu país. Salve e abra o prontuário, ou salve e agende uma consulta.",
            en: "The document and insurance fields adapt to your country. Save and open the chart, or save and book an appointment.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "El sistema avisa si el paciente ya existe (por documento o por nombre+teléfono). Ojo: al buscar por RUT/CPF, escríbelo como está guardado (la búsqueda no ignora puntos ni guiones).",
          pt: "O sistema avisa se o paciente já existe (por documento ou nome+telefone). Atenção: ao buscar por RUT/CPF, escreva como está salvo (a busca não ignora pontos nem traços).",
          en: "The system warns if the patient already exists (by document or name+phone). Note: when searching by RUT/CPF, type it as stored (search doesn't ignore dots or dashes).",
        },
      },
    ],
  },
  {
    slug: "asistente-de-soporte",
    categoryId: "primeros-pasos",
    updated: "2026-06-07",
    readingMinutes: 3,
    keywords: ["ayuda", "soporte", "asistente", "bug", "reportar", "chat interno"],
    related: ["que-hace-sofia"],
    title: {
      es: "Pedir ayuda dentro del sistema (botón Ayuda)",
      pt: "Pedir ajuda dentro do sistema (botão Ajuda)",
      en: "Get help inside the system (Help button)",
    },
    excerpt: {
      es: "Un asistente de soporte te guía por el software y registra tus reportes al equipo.",
      pt: "Um assistente de suporte te guia pelo software e registra seus reportes à equipe.",
      en: "A support assistant guides you through the software and logs your reports to the team.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Dentro del sistema hay un botón «Ayuda» (esquina inferior). Abre un asistente de soporte que conoce las pantallas y flujos del software y responde tus dudas.",
          pt: "Dentro do sistema há um botão «Ajuda» (canto inferior). Abre um assistente de suporte que conhece as telas e fluxos do software e responde suas dúvidas.",
          en: "Inside the system there's a “Help” button (bottom corner). It opens a support assistant that knows the software's screens and flows and answers your questions.",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Puedes reportar un bug, sugerir una mejora o resolver una duda; los reportes llegan a nuestro equipo.",
            pt: "Você pode reportar um bug, sugerir uma melhoria ou tirar uma dúvida; os reportes chegam à nossa equipe.",
            en: "You can report a bug, suggest an improvement or ask a question; reports reach our team.",
          },
          {
            es: "Puedes adjuntar una captura de pantalla o enviar un audio, y seguir navegando mientras conversas.",
            pt: "Você pode anexar uma captura de tela ou enviar um áudio, e continuar navegando enquanto conversa.",
            en: "You can attach a screenshot or send an audio, and keep navigating while you chat.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Este asistente de soporte no es Sofía: Sofía atiende a tus pacientes por WhatsApp; el asistente te ayuda a ti con el software y no accede a los datos de tus pacientes.",
          pt: "Este assistente de suporte não é a Sofía: a Sofía atende seus pacientes no WhatsApp; o assistente ajuda você com o software e não acessa os dados dos seus pacientes.",
          en: "This support assistant isn't Sofía: Sofía serves your patients on WhatsApp; the assistant helps you with the software and doesn't access your patients' data.",
        },
      },
    ],
  },

  // FICHA CLÍNICA (Ola 3)
  {
    slug: "emitir-documentos-clinicos",
    categoryId: "clinico",
    updated: "2026-05-24",
    readingMinutes: 4,
    keywords: ["documento", "receta", "consentimiento", "certificado", "emitir", "folio", "anular"],
    related: ["registrar-evolucion", "crear-plan-tratamiento"],
    title: {
      es: "Emitir documentos clínicos (recetas, consentimientos)",
      pt: "Emitir documentos clínicos (receitas, consentimentos)",
      en: "Issue clinical documents (prescriptions, consents)",
    },
    excerpt: {
      es: "Genera recetas, consentimientos o certificados desde la ficha, con plantillas y variables.",
      pt: "Gere receitas, consentimentos ou certificados na ficha, com modelos e variáveis.",
      en: "Generate prescriptions, consents or certificates from the chart, with templates and variables.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Desde la sección Documentos de la ficha del paciente emites documentos clínicos a partir de plantillas (receta, consentimiento, certificado, laudo y más).",
          pt: "Na seção Documentos da ficha do paciente você emite documentos clínicos a partir de modelos (receita, consentimento, certificado, laudo e mais).",
          en: "From the Documents section of the patient's chart you issue clinical documents from templates (prescription, consent, certificate, report and more).",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Elige el tipo y la plantilla; se rellena con los datos del paciente y del profesional.",
            pt: "Escolha o tipo e o modelo; ele é preenchido com os dados do paciente e do profissional.",
            en: "Choose the type and template; it's filled with the patient's and professional's data.",
          },
          {
            es: "Revisa el preview y guarda como borrador o emite. Al emitir, puedes imprimir o enviar por email.",
            pt: "Revise o preview e salve como rascunho ou emita. Ao emitir, você pode imprimir ou enviar por e-mail.",
            en: "Review the preview and save as draft or issue it. Once issued, you can print it or send it by email.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        text: {
          es: "El folio DOC-AAAA-NNNN es un correlativo interno, no un documento tributario. El PDF incluye una línea de firma con nombre y registro, pero no es firma digital certificada. Un documento emitido no se edita: se anula (con motivo, solo administradores).",
          pt: "O folio DOC-AAAA-NNNN é um correlativo interno, não um documento fiscal. O PDF inclui uma linha de assinatura com nome e registro, mas não é assinatura digital certificada. Um documento emitido não se edita: anula-se (com motivo, só administradores).",
          en: "The DOC-YYYY-NNNN folio is an internal sequence, not a tax document. The PDF includes a signature line with name and registration, but it isn't a certified digital signature. An issued document can't be edited: it's voided (with a reason, admins only).",
        },
      },
    ],
  },
  {
    slug: "protocolos-del-paciente",
    categoryId: "clinico",
    updated: "2026-05-30",
    readingMinutes: 3,
    keywords: ["protocolo", "paciente", "vincular", "checklist", "prontuario"],
    related: ["marcar-el-odontograma", "registrar-evolucion"],
    title: {
      es: "Vincular protocolos clínicos a un paciente",
      pt: "Vincular protocolos clínicos a um paciente",
      en: "Link clinical protocols to a patient",
    },
    excerpt: {
      es: "Marca en la ficha los protocolos que se aplican siempre a ese paciente.",
      pt: "Marque na ficha os protocolos que se aplicam sempre a esse paciente.",
      en: "Mark on the chart the protocols that always apply to that patient.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "En la ficha del paciente, la sección Protocolos deja vincular protocolos clínicos de referencia (los que siempre deben aplicarse a ese paciente).",
          pt: "Na ficha do paciente, a seção Protocolos permite vincular protocolos clínicos de referência (os que sempre devem ser aplicados a esse paciente).",
          en: "In the patient's chart, the Protocols section lets you link reference clinical protocols (those that should always apply to that patient).",
        },
      },
      {
        type: "list",
        items: [
          {
            es: "Pulsa «+», busca y selecciona los protocolos (puedes añadir una observación) y guarda.",
            pt: "Clique em «+», busque e selecione os protocolos (você pode adicionar uma observação) e salve.",
            en: "Click “+”, search and select the protocols (you can add a note) and save.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Vincular un protocolo es una marca clínica de referencia: no cobra ni agenda nada. Los protocolos se crean antes en Administración; aquí solo se vinculan. Requiere perfil de dentista.",
          pt: "Vincular um protocolo é uma marca clínica de referência: não cobra nem agenda nada. Os protocolos são criados antes em Administração; aqui só se vinculam. Requer perfil de dentista.",
          en: "Linking a protocol is a reference clinical mark: it doesn't bill or schedule anything. Protocols are created beforehand in Administration; here they're only linked. Requires a dentist profile.",
        },
      },
    ],
  },

  // FINANZAS (Ola 3)
  {
    slug: "empresas-y-convenios-b2b",
    categoryId: "finanzas",
    updated: "2026-04-27",
    readingMinutes: 4,
    keywords: ["empresa", "convenio", "b2b", "planilla", "descuento", "corporativo"],
    related: ["convenios-y-retencion", "buscar-y-crear-paciente"],
    title: {
      es: "Empresas y convenios B2B",
      pt: "Empresas e convênios B2B",
      en: "Companies and B2B agreements",
    },
    excerpt: {
      es: "Vincula pacientes a una empresa que cubre su atención o a un convenio con descuento.",
      pt: "Vincule pacientes a uma empresa que cobre o atendimento ou a um convênio com desconto.",
      en: "Link patients to a company that covers their care or to an agreement with a discount.",
    },
    body: [
      {
        type: "p",
        text: {
          es: "Además de los convenios con retención, puedes trabajar con empresas (B2B): una empresa que cubre la atención de sus pacientes. Se cadastran en Administración (Empresas y Convenios).",
          pt: "Além dos convênios com retención, você pode trabalhar com empresas (B2B): uma empresa que cobre o atendimento dos seus pacientes. São cadastradas em Administração (Empresas e Convênios).",
          en: "Beyond insurers with withholding, you can work with companies (B2B): a company that covers its patients' care. They're registered under Administration (Companies and Agreements).",
        },
      },
      {
        type: "steps",
        items: [
          {
            es: "Cadastra la empresa (razón social, documento, responsable) y el convenio (con su descuento).",
            pt: "Cadastre a empresa (razão social, documento, responsável) e o convênio (com seu desconto).",
            en: "Register the company (legal name, tax ID, contact) and the agreement (with its discount).",
          },
          {
            es: "En el cadastro del paciente, vincúlalo al convenio y/o a la empresa.",
            pt: "No cadastro do paciente, vincule-o ao convênio e/ou à empresa.",
            en: "In the patient's registration, link them to the agreement and/or the company.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          es: "Si el convenio ya está asociado a una empresa, el campo empresa queda bloqueado en el paciente para mantener la coherencia.",
          pt: "Se o convênio já está associado a uma empresa, o campo empresa fica bloqueado no paciente para manter a coerência.",
          en: "If the agreement is already tied to a company, the company field is locked on the patient to keep consistency.",
        },
      },
    ],
  },
] as const;
