// src/data/articles.js

export const articles = [
  // ARTÍCULO 1: BULLYING
  {
    id: "article-01",
    category: "Familia",
    title: "Bullying: Cómo Proteger a tus Hijos",
    slug: "bullying-proteger-hijos",
    image: "/blogbullying.jpeg",
    imageAlt: "Niño sentado solo en la escuela",
    readingTime: 2,
    preview: "El bullying afecta a 1 de cada 3 niños en la escuela. No estás solo. Aquí te enseñamos cómo detectarlo y qué hacer para proteger a tu hijo.",
    
    content: `
**¿Qué es el bullying?**

El bullying es cuando un niño molesta a otro una y otra vez. No es una sola pelea. Es algo que pasa muchas veces. Puede ser con golpes, palabras feas o dejándolo solo.

**Señales de que tu hijo sufre bullying:**

Tu hijo puede no decirte nada, pero su cuerpo habla. Fíjate si:
- Ya no quiere ir a la escuela
- Llega con golpes o ropa rota
- Está más callado o triste
- No duerme bien
- Dice que le duele la panza antes de ir a clases

**¿Qué puedes hacer?**

**1. Escucha sin juzgar**
Si tu hijo te cuenta algo, no le digas "defiéndete" o "pégale tú también". Eso no ayuda. Solo escúchalo y abrázalo.

**2. Habla con la escuela**
Los maestros deben saber lo que pasa. Pide una cita y explica todo con calma. Lleva notas de lo que ha pasado.

**3. Fortalece su confianza**
Dile todos los días algo bueno sobre él. "Eres inteligente", "Me gusta cómo dibujas", "Eres fuerte". Las palabras bonitas curan.

**4. Enséñale a pedir ayuda**
Tu hijo debe saber que pedir ayuda no es de cobardes. Es de valientes. Enséñale a decir: "Necesito ayuda" o "Esto no está bien".

**5. Busca apoyo profesional**
Si ves que tu hijo está muy triste o con miedo, habla con un psicólogo. No esperes. SaludCompartida tiene terapeutas que pueden ayudar.

**Recuerda:** El bullying no es culpa de tu hijo. Nunca. Tú eres su protección más grande. Con tu amor y atención, puede salir adelante.

**¿Necesitas hablar con alguien?** Agenda una sesión de terapia familiar desde tu cuenta SaludCompartida.
`,
    
    actionItems: [
      "Habla con tu hijo todos los días: 'Cuéntame algo de tu día'",
      "Observa cambios: ¿duerme mal? ¿ya no quiere ir a la escuela?",
      "Habla con sus maestros esta semana",
      "Fortalece su autoestima con palabras bonitas diarias",
      "Si es grave, agenda terapia hoy mismo"
    ],
    
    tags: ["niños", "escuela", "emociones", "familia", "protección"],
    relatedArticles: ["article-08", "article-14"]
  },

  // ARTÍCULO 2: PALABRAS QUE SANAN
  {
    id: "article-02",
    category: "Bienestar",
    title: "Palabras que Sanan: Cómo Cambiar tu Mente con lo que Dices",
    slug: "palabras-que-sanan",
    image: "/blogpalabrasquesanan.jpeg",
    imageAlt: "Mujer sonriendo frente al espejo",
    readingTime: 2,
    preview: "Tu cerebro cree lo que tú le dices. Si te hablas feo, te sientes mal. Si te hablas bonito, todo cambia. Aquí te enseñamos cómo.",
    
    content: `
**El poder de las palabras**

¿Sabías que tu cerebro no sabe la diferencia entre lo que piensas y lo que es real? Si siempre te dices "no puedo", "soy tonto" o "todo me sale mal", tu cerebro lo cree. Y entonces, sí te sientes mal.

Pero si cambias tus palabras, cambias tu vida.

**¿Cómo funciona esto?**

Imagina que tu cerebro es como un camino. Si siempre caminas por el mismo lado, ese camino se hace más grande y fácil de seguir. Lo mismo pasa con tus pensamientos.

Si piensas cosas negativas todos los días, ese camino se vuelve automático. Pero puedes crear un camino nuevo con pensamientos buenos.

**Palabras que hacen daño vs. Palabras que sanan:**

"Soy un fracaso" → "Estoy aprendiendo"
"Nunca voy a lograrlo" → "Lo voy a intentar otra vez"
"Todo está mal" → "Hoy fue difícil, pero mañana puede ser mejor"
"No sirvo para nada" → "Hago lo mejor que puedo"

**Ejercicio: La Gratitud Diaria**

Todas las mañanas, antes de levantarte, di en voz alta:
- "Gracias por este nuevo día"
- "Gracias por mi familia"
- "Gracias porque puedo intentarlo otra vez"

Parece simple, pero funciona. La gratitud cambia tu cerebro.

**Ejercicio: El Espejo Amigo**

Todas las noches, mírate al espejo y di:
- "Lo hiciste bien hoy"
- "Eres suficiente"
- "Mañana será mejor"

Al principio te va a dar pena o risa. Está bien. Sigue haciéndolo. En 21 días, verás el cambio.

**Cambia tu forma de hablar con otros**

No solo es cómo te hablas a ti. También es cómo hablas con tu familia.

En vez de decir: "¿Por qué siempre haces todo mal?"
Di: "Sé que puedes hacerlo mejor. Yo te ayudo."

Las palabras bonitas no solo te sanan a ti. También sanan a quien las escucha.

**Recuerda:** Tu cerebro es como una computadora. Lo que le metes, es lo que saca. Si le metes palabras feas, sale tristeza. Si le metes palabras bonitas, sale paz.

Empieza hoy. Una palabra a la vez.
`,
    
    actionItems: [
      "Cada mañana di 3 cosas por las que estás agradecido",
      "Frente al espejo por la noche: 'Lo hice bien hoy'",
      "Cambia una frase negativa por una positiva hoy",
      "Habla bonito a tu familia: más 'te quiero', menos reclamos",
      "En 21 días evalúa cómo te sientes"
    ],
    
    tags: ["mente", "bienestar", "gratitud", "autoestima", "emociones"],
    relatedArticles: ["article-04", "article-08"]
  },

  // ARTÍCULO 3: ALIMENTACIÓN
  {
    id: "article-03",
    category: "Salud",
    title: "Come Bien, Vive Mejor: La Alimentación que Sana",
    slug: "alimentacion-sana",
    image: "/blogalimentacion.jpeg",
    imageAlt: "Familia preparando comida saludable",
    readingTime: 2,
    preview: "No necesitas dietas caras. Con comida simple y casera puedes cuidar a toda tu familia. Aquí te decimos cómo.",
    
    content: `
**La comida es medicina**

Todo lo que comes se convierte en tu cuerpo. Si comes cosas buenas, tu cuerpo funciona bien. Si comes puras cosas fritas o con mucha azúcar, tu cuerpo se enferma.

No es tu culpa si no sabías esto. Nadie nos enseña. Pero hoy lo aprendes.

**¿Qué es comer bien?**

Comer bien no es comer caro. Es comer:
- Frijoles, lentejas, huevos (proteína)
- Tortillas, arroz integral, avena (energía)
- Verduras y frutas de temporada (vitaminas)
- Agua natural (no refrescos)

**Lo que SÍ debes comer todos los días:**

Frijoles o lentejas (baratos y llenan)
2 frutas (plátano, naranja, manzana)
Verduras en el almuerzo y cena
Huevos (2-3 veces por semana)
Agua (6-8 vasos al día)

**Lo que NO debes comer seguido:**

Refrescos (pura azúcar, no alimenta)
Frituras de bolsa (sal y grasa nada más)
Pan dulce todos los días (azúcar que enferma)
Comida frita diario (el aceite reutilizado hace daño)

**Menú económico para una semana:**

Lunes: Frijoles con arroz, ensalada, tortillas
Martes: Huevos con nopales, frijoles, tortillas
Miércoles: Lentejas con verduras, tortillas
Jueves: Sopa de verduras con pollo (un pedazo chico)
Viernes: Quesadillas con frijoles y ensalada
Sábado: Arroz con huevo, frijoles
Domingo: Pollo guisado con verduras

**Tips para gastar menos y comer mejor:**

1. Compra en el mercado, no en el súper. Las verduras y frutas de temporada son más baratas.

2. Cocina suficiente para 2 días. Ahorras gas y tiempo.

3. Los frijoles son tu mejor amigo. Un kilo de frijoles rinde para muchos días y cuesta poco.

4. Toma agua, no refresco. El agua es gratis. El refresco cuesta y enferma.

5. Las sobras se aprovechan. El arroz de ayer se vuelve arroz frito hoy. El pollo de ayer se vuelve tacos hoy.

**¿Por qué es importante para tus hijos?**

Los niños que comen bien aprenden mejor en la escuela, se enferman menos, tienen más energía para jugar y crecen fuertes.

Los niños que comen mal se cansan rápido, se enferman seguido, no ponen atención en clase y pueden tener diabetes de grandes.

**Recuerda:** No necesitas dinero para comer sano. Necesitas saber qué comprar. Frijoles, verduras, frutas, huevos y agua. Con eso, tu familia está protegida.

Empieza cambiando una cosa esta semana. Cambia el refresco por agua. Eso ya es un gran paso.
`,
    
    actionItems: [
      "Esta semana: Cambia 1 refresco al día por agua",
      "Compra verduras de temporada en el mercado (no súper)",
      "Cocina frijoles el domingo para toda la semana",
      "Agrega 1 fruta al desayuno de tus hijos",
      "Evita freír: mejor cocina al horno o a la plancha"
    ],
    
    tags: ["alimentación", "salud", "familia", "niños", "economía"],
    relatedArticles: ["article-07", "article-13"]
  },

  // ARTÍCULO 4: SER PADRES EN 2025
  {
    id: "article-04",
    category: "Familia",
    title: "Ser Padres en 2025: Nuevos Tiempos, Mismo Amor",
    slug: "ser-padres-2025",
    image: "/blogserpadreen2025.jpeg",
    imageAlt: "Padre e hijo mirando una tablet juntos",
    readingTime: 2,
    preview: "Criar hijos hoy es diferente a como te criaron a ti. Hay celulares, internet y nuevos retos. Pero el amor sigue siendo lo más importante.",
    
    content: `
**Todo cambió, pero tú puedes con esto**

Cuando tú eras niño, las cosas eran más simples. Jugabas en la calle, no había celulares, y todos los papás educaban igual.

Hoy todo es diferente. Tus hijos tienen celular, ven cosas en internet que tú nunca viste, y hay mil formas de ser familia.

¿Te sientes perdido? No estás solo. Todos los papás se sienten así.

**Los nuevos retos de ser papá o mamá:**

El celular y las redes sociales: Tus hijos quieren TikTok, Instagram, YouTube. Tú no entiendes nada de eso. Pero ellos sí.

Los videojuegos: Antes jugaban fútbol afuera. Ahora juegan Fortnite adentro.

El internet: Pueden ver cosas buenas, pero también cosas malas. Y tú no siempre puedes ver qué están viendo.

La comunicación: Antes con un "porque yo lo digo" bastaba. Hoy tus hijos te preguntan "¿por qué?" todo el tiempo.

**¿Qué hacer con la tecnología?**

No puedes prohibir todo. El mundo es digital ahora. Pero sí puedes poner reglas.

**Reglas básicas:**

1. Nada de celular en la mesa. La comida es para platicar en familia, no para ver el teléfono.

2. Horarios claros. "Puedes usar el celular de 6 a 8pm. Después, todos los celulares se quedan en la sala."

3. Conoce sus contraseñas. Mientras sean menores de 15 años, tú debes tener acceso a sus cuentas.

4. Pregunta qué ven. "¿Qué estás viendo?" "¿Quién es ese?" Muestra interés, no control.

5. Usa el control parental. YouTube Kids, controles de tiempo. Existen y son gratis.

**Lo que NUNCA debe cambiar:**

El tiempo juntos: 10 minutos al día preguntándole sobre su día valen más que mil juguetes.

Los límites claros: "En esta casa no se grita" "En esta casa nos respetamos" Las reglas dan seguridad.

El abrazo diario: Tus hijos necesitan sentir tu amor. Un abrazo todas las noches les recuerda que están seguros.

Estar presente: No se trata de estar todo el tiempo. Se trata de cuando estés, estar de verdad. Sin celular, sin distracciones.

**Errores comunes (y cómo evitarlos):**

En vez de "Tu primo sí saca buenas calificaciones"
Di: "Sé que puedes mejorar. Yo te ayudo."

En vez de gritarles todo el tiempo
Habla firme pero tranquilo. El grito pierde poder si es diario.

En vez de revisar su celular a escondidas
Diles: "Voy a revisar tu celular una vez por semana. Es por tu seguridad."

Si te equivocas, di: "Me pasé gritando. Perdón. Vamos a hablar mejor."

**Recuerda:** No existen los padres perfectos. Existen los padres que lo intentan. Tus hijos no necesitan perfección. Necesitan tu amor, tu tiempo y saber que estás ahí.

Aunque el mundo cambie, el amor de padres no cambia. Ese es tu superpoder.
`,
    
    actionItems: [
      "Hoy: 10 minutos sin celular platicando con cada hijo",
      "Establece 1 regla nueva sobre el uso del celular",
      "Abraza a tus hijos antes de dormir (aunque sean grandes)",
      "Pregunta: '¿Qué fue lo mejor de tu día?'",
      "Pide perdón si gritaste hoy"
    ],
    
    tags: ["padres", "familia", "tecnología", "educación", "amor"],
    relatedArticles: ["article-08", "article-10"]
  },

  // ARTÍCULO 5: ABUSO
  {
    id: "article-05",
    category: "Familia",
    title: "Abuso: Reconocerlo y Pedir Ayuda",
    slug: "abuso-reconocer-ayuda",
    image: "/blogabuso.jpeg",
    imageAlt: "Manos extendidas ofreciendo ayuda",
    readingTime: 2,
    preview: "El abuso no es normal. Nunca. Si alguien te lastima física o emocionalmente, mereces ayuda. Aquí te decimos cómo.",
    
    content: `
**El abuso NO es normal**

El abuso es cuando alguien te lastima una y otra vez. Puede ser con golpes, palabras feas, o haciéndote sentir que no vales nada.

No importa quién sea esa persona. Puede ser tu pareja, un familiar, o alguien que conoces. El abuso siempre está mal.

**Tipos de abuso:**

Abuso físico: Golpes, empujones, jalones de pelo. Cualquier cosa que lastime tu cuerpo.

Abuso emocional: Gritos, insultos, amenazas. Te hacen sentir pequeño o sin valor.

Abuso económico: No te dejan trabajar o manejar dinero. Te controlan con el dinero.

Abuso sexual: Tocan tu cuerpo sin tu permiso. Te obligan a hacer cosas que no quieres.

**Señales de que estás en una relación de abuso:**

- Te tiene miedo a esa persona
- Caminas en puntitas para no hacer enojar a esa persona
- Te dicen que eres tonto, feo, o que nadie te va a querer
- Te revisan el celular todo el tiempo
- No te dejan ver a tu familia o amigos
- Te culpan de todo lo malo que pasa
- Te pegan y luego dicen "perdón, no va a volver a pasar" (pero sí vuelve a pasar)

**¿Por qué no te vas?**

Muchas personas preguntan: "Si te pega, ¿por qué no te vas?" No es tan fácil.

Tal vez tienes miedo. Tal vez no tienes dinero. Tal vez piensas que tus hijos necesitan un papá o una mamá. Tal vez crees que es tu culpa. Tal vez esa persona te dice que va a cambiar.

Todo eso es normal. Pero el abuso no es tu culpa. Nunca.

**¿Qué puedes hacer?**

1. Reconoce que es abuso. El primer paso es decir: "Esto no está bien. No me lo merezco."

2. Habla con alguien de confianza. Un amigo, un familiar, un maestro. Alguien que te crea y te apoye.

3. Haz un plan de seguridad. Si decides irte, ten un lugar a dónde ir. Guarda un poco de dinero. Ten documentos importantes listos.

4. Llama a una línea de ayuda. En México: 911 para emergencias. En USA: 1-800-799-7233 (National Domestic Violence Hotline).

5. No estás solo. Hay refugios, abogados y psicólogos que te pueden ayudar. Gratis.

**Si conoces a alguien que sufre abuso:**

No le digas "¿por qué no te vas?" Eso no ayuda.

Dile: "Te creo. No es tu culpa. Estoy aquí para ti."

Ofrece ayuda práctica: un lugar donde quedarse, cuidar a sus hijos, acompañarla a hacer una denuncia.

**Para los hijos que ven abuso:**

Si ves que tu papá le pega a tu mamá, o tu mamá le pega a tu papá, no es tu culpa. Tú no causaste eso. Y no tienes que arreglarlo.

Habla con un adulto de confianza: un maestro, un tío, un abuelo. Ellos pueden ayudar.

**Recuerda:** El abuso no es amor. El amor no duele. El amor no da miedo. El amor no te hace sentir pequeño.

Tú mereces vivir sin miedo. Tú mereces respeto. Tú mereces ser feliz.

Pedir ayuda no es ser débil. Es ser valiente.
`,
    
    actionItems: [
      "Si estás en peligro AHORA, llama al 911",
      "Guarda números de emergencia en tu celular",
      "Habla con una persona de confianza esta semana",
      "Haz una lista de lugares seguros donde ir",
      "Agenda terapia en SaludCompartida para hablar de esto"
    ],
    
    tags: ["abuso", "violencia", "ayuda", "protección", "seguridad"],
    relatedArticles: ["article-06", "article-15"]
  },

  // ARTÍCULO 6: NI UNA MENOS
  {
    id: "article-06",
    category: "Familia",
    title: "Ni Una Menos: Protegiendo a las Mujeres de tu Familia",
    slug: "ni-una-menos",
    image: "/blogniunamenos.jpeg",
    imageAlt: "Mujeres unidas tomadas de la mano",
    readingTime: 2,
    preview: "Cada día mueren mujeres por violencia. No más silencio. Aquí te enseñamos las señales de peligro y cómo actuar.",
    
    content: `
**La realidad que duele**

Cada día, en México y América Latina, mueren mujeres a manos de sus parejas o ex parejas. Esto se llama feminicidio.

No es un crimen de pasión. Es un crimen de odio. Y se puede prevenir.

**Las señales de peligro:**

La violencia no empieza con un golpe. Empieza mucho antes. Fíjate en estas señales:

1. Celos extremos: Revisa su celular, no la deja ver a su familia, pregunta dónde está todo el tiempo.

2. Control: Le dice qué ponerse, con quién hablar, a dónde ir.

3. Aislamiento: La separa de sus amigos y familia. Quiere que solo esté con él.

4. Insultos: Le dice que es fea, tonta, que nadie la va a querer.

5. Amenazas: "Si me dejas, te mato" "Si me dejas, me mato yo" "Te voy a quitar a los niños"

6. Violencia que va subiendo: Primero empuja, luego cachetea, luego golpea. Cada vez es peor.

**¿Por qué no se van?**

Esta es la pregunta que todos hacen. Y la respuesta es complicada.

Tiene miedo. Él le ha dicho que si se va, la va a matar. Y muchas veces, lo hace.

No tiene dinero. Él controla todo el dinero. Ella no tiene cómo mantenerse.

Tiene hijos. Piensa que es mejor tener un papá violento que no tener papá.

Tiene vergüenza. Piensa que la gente va a decir que es su culpa.

Tiene esperanza. Él le dice que va a cambiar. Ella le cree. Otra vez.

**Qué hacer si tu hija, hermana o amiga está en peligro:**

1. No la juzgues. No le digas "te lo dije" o "ya déjalo". Eso no ayuda.

2. Créele. Si te dice que tiene miedo, créele. El miedo de las mujeres está basado en la realidad.

3. Ayúdala a hacer un plan. ¿A dónde puede ir? ¿Tiene documentos? ¿Tiene dinero guardado?

4. No la presiones a irse. Tiene que ser su decisión. Presionarla puede ser más peligroso.

5. Mantén la comunicación. Aunque esté con él, sigue hablándole. Que sepa que tú estás ahí.

**Qué hacer si tú estás en peligro:**

1. Confía en tu instinto. Si sientes miedo, es por algo. Tu cuerpo te está diciendo: "peligro".

2. Haz un plan de escape. Guarda copias de tus documentos. Ten una maleta lista. Ten dinero guardado.

3. Identifica lugares seguros. ¿A dónde puedes correr? ¿Quién te puede ayudar?

4. Llama a la policía. Haz una denuncia. Aunque no pase nada, queda el registro.

5. Busca un refugio. Hay lugares donde puedes ir con tus hijos. Gratis. Seguros.

**Números de emergencia:**

México: 911
USA: 1-800-799-7233 (24/7)
Refugios: Busca "refugio para mujeres" en tu ciudad

**Para los hombres:**

Si eres hombre y estás leyendo esto, escucha:

La violencia contra las mujeres no es normal. No es parte de ser hombre. Es un crimen.

Si conoces a un amigo que maltrata a su mujer, habla con él. Dile que eso está mal.

Si tienes hijos, enséñales que los hombres de verdad no pegan. Los hombres de verdad respetan.

**Recuerda:** Ni una mujer más. Ni una hija, ni una madre, ni una hermana, ni una amiga.

Si ves algo, di algo. Tu silencio puede costar una vida.
`,
    
    actionItems: [
      "Si conoces a alguien en peligro, habla con ella HOY",
      "Guarda números de emergencia en tu celular",
      "Ofrece tu casa como lugar seguro si es necesario",
      "Si eres hombre: habla con tus hijos sobre el respeto",
      "Comparte este artículo para que más personas sepan"
    ],
    
    tags: ["feminicidio", "violencia de género", "mujeres", "protección", "ni una menos"],
    relatedArticles: ["article-05", "article-15"]
  },

  // ARTÍCULO 7: PRESUPUESTO SEMANAL
  {
    id: "article-07",
    category: "Finanzas",
    title: "Tu Dinero Alcanza: Cómo Hacer un Presupuesto Semanal",
    slug: "presupuesto-semanal",
    image: "/blogpresupuestosemanal.jpeg",
    imageAlt: "Familia contando dinero en la mesa",
    readingTime: 2,
    preview: "No importa cuánto ganes. Lo que importa es cómo lo usas. Aprende a hacer que tu dinero rinda más con estos pasos simples.",
    
    content: `
**El dinero no alcanza... ¿o sí?**

Muchas veces decimos "no me alcanza". Pero la verdad es que no sabemos a dónde se va el dinero.

Si haces un presupuesto semanal, vas a ver que sí alcanza. Solo necesitas saber cómo organizarlo.

**¿Qué es un presupuesto?**

Un presupuesto es un plan. Le dices a tu dinero a dónde ir, antes de gastarlo.

Si no tienes un plan, el dinero se va solo. En cosas que no necesitas.

**Paso 1: Anota TODO lo que gastas**

Por una semana, anota cada peso que gastes. TODO. El café, el chicle, el camión. Todo.

Al final de la semana, suma. Vas a sorprenderte de cuánto gastas en cosas chicas.

**Paso 2: Divide tu dinero en 4 partes**

Lo que NECESITAS (comida, renta, servicios) - 50%
Lo que DEBES (deudas, préstamos) - 20%
Lo que AHORRAS (para emergencias) - 20%
Lo que DISFRUTAS (salidas, antojos) - 10%

Ejemplo con $1,000 a la semana:
- $500 para comida y gastos básicos
- $200 para pagar deudas
- $200 para ahorrar
- $100 para gustos

**Paso 3: Haz una lista de gastos fijos**

Gastos que SÍ o SÍ tienes que pagar cada semana:
- Comida
- Renta (divide entre 4 semanas)
- Luz, agua, gas
- Transporte
- Escuela de los niños

Suma todo eso. Ese es tu dinero comprometido.

**Paso 4: Encuentra dónde recortar**

Mira tu lista de gastos. ¿Hay algo que puedes quitar?

En vez de café de la cafetería ($30), haz café en casa ($3)
En vez de comida en la calle todos los días ($600/semana), lleva lunch ($200/semana)
En vez de taxi ($50), toma camión ($10)

Ahorras: $30 + $400 + $40 = $470 a la semana. Eso es $1,880 al mes.

**Paso 5: El método de los sobres**

Este método es viejo pero funciona.

Saca tu dinero en efectivo. Ponlo en sobres con etiquetas:

Sobre 1: Comida
Sobre 2: Transporte
Sobre 3: Servicios
Sobre 4: Ahorros
Sobre 5: Gustos

Solo puedes gastar lo que está en cada sobre. Si se acaba el sobre de "gustos", ya no hay más gustos esa semana.

**Paso 6: La regla de las 24 horas**

Antes de comprar algo que NO es urgente, espera 24 horas.

¿Todavía lo quieres después de 24 horas? Entonces tal vez sí lo necesitas.

¿Ya se te olvidó? Entonces era un antojo. Te ahorraste ese dinero.

**Errores comunes:**

Poner metas imposibles: "Voy a ahorrar $500 a la semana" (cuando ganas $800). Mejor empieza con $50.

No anotar los gastos chicos: Los $10 aquí y $20 allá se suman.

No tener un fondo de emergencias: Siempre pasa algo. El niño se enferma, se descompone la lavadora. Ten dinero guardado.

**Apps gratuitas que ayudan:**

- Finerio (México)
- Wallet (Android e iOS)
- Tu cuaderno y lápiz (gratis y funciona)

**Recuerda:** No se trata de cuánto ganas. Se trata de cómo lo usas. Hay gente que gana mucho y no le alcanza. Y gente que gana poco y ahorra.

La diferencia es el plan. Haz tu presupuesto. Tu dinero va a rendir más.
`,
    
    actionItems: [
      "Esta semana: Anota TODOS tus gastos en un cuaderno",
      "Divide tu dinero en 4 sobres: necesitas, debes, ahorras, disfrutas",
      "Identifica 1 gasto que puedes recortar hoy",
      "Abre una cuenta de ahorros (aunque sea con $50)",
      "Regla 24 horas: NO compres nada no urgente sin esperar un día"
    ],
    
    tags: ["finanzas", "ahorro", "presupuesto", "dinero", "economía"],
    relatedArticles: ["article-03", "article-13"]
  },

  // ARTÍCULO 8: LA ADOLESCENCIA
  {
    id: "article-08",
    category: "Familia",
    title: "La Adolescencia: Entendiendo a tus Hijos Teenagers",
    slug: "adolescencia-teenagers",
    image: "/blogadolescencia.jpeg",
    imageAlt: "Adolescente sentado pensativo",
    readingTime: 2,
    preview: "Tu hijo ya no es un niño, pero tampoco es adulto. Está confundido. Tú también. Aquí te ayudamos a entender esta etapa.",
    
    content: `
**¿Qué le pasó a mi hijo?**

Hace poco era un niño dulce que te abrazaba y te contaba todo. Ahora está enojado, se encierra en su cuarto, y casi no te habla.

Bienvenido a la adolescencia. La etapa más difícil... para todos.

**¿Qué es la adolescencia?**

Es cuando tu hijo deja de ser niño y se convierte en adulto. Dura de los 12 a los 18 años (más o menos).

Su cuerpo cambia. Sus emociones están locas. Su cerebro se está reorganizando. Es como una construcción: todo está patas arriba.

**Lo que está pasando en su cerebro:**

El cerebro de un adolescente no está terminado. La parte que controla las emociones y las decisiones aún se está desarrollando.

Por eso:
- Explota por cosas chiquitas
- Hace cosas peligrosas sin pensar
- Un día te ama, al otro te odia
- No puede controlar sus emociones

NO es tu culpa. NO es porque seas mal padre. Es biología.

**Cambios físicos que los confunden:**

Niñas: Les crece el pecho, les baja la menstruación, les salen curvas.
Niños: Se les engrosa la voz, les crece el pene, les sale vello.

Todo eso da miedo y vergüenza. No saben cómo manejar su nuevo cuerpo.

**Cambios emocionales:**

- Quieren independencia, pero te necesitan
- Quieren ser únicos, pero vestirse igual que sus amigos
- Se preocupan MUCHO por lo que otros piensan
- Se sienten incomprendidos (y es cierto)
- Todo es drama: el fin del mundo o lo mejor del mundo

**¿Qué NO debes hacer?**

Decir "estás exagerando" cuando está triste. Para él, es real.
Burlarte de su aspecto. Ya se siente feo, no lo hagas sentir peor.
Compararlo. "Tu hermano a tu edad..." Eso no ayuda.
Invadir su privacidad sin razón. Necesita su espacio.
Dejarlo solo. Aunque no lo parezca, te necesita.

**¿Qué SÍ debes hacer?**

1. Escucha sin juzgar. Aunque suene tonto para ti, es importante para él.

2. Establece límites claros. "Puedes salir, pero llego a las 10pm. Sin excepciones."

3. Respeta su privacidad (con límites). Toca antes de entrar a su cuarto. Pero sí puedes revisar su celular si hay señales de peligro.

4. Mantén la calma. Si explotas cuando él explota, todo empeora.

5. Busca momentos para conectar. En el carro, haciendo la cena, viendo una serie juntos.

**Señales de que necesita ayuda profesional:**

- Ya no come o come demasiado
- Duerme todo el día o no duerme
- Sus calificaciones caen mucho
- Se lastima a propósito (cortes en los brazos)
- Habla de morir o suicidarse
- Usa drogas o alcohol

Si ves algo de esto, NO esperes. Busca un psicólogo YA. SaludCompartida tiene terapeutas que entienden a adolescentes.

**Cómo hablar de temas difíciles:**

Sexo: No evites el tema. Es mejor que aprenda de ti que de internet.

Drogas: Habla claro. Explica por qué son peligrosas. No solo digas "porque no".

Amigos: Conoce a sus amigos. Invítalos a tu casa. Así sabes con quién anda.

Redes sociales: Habla de los peligros: el cyberbullying, los depredadores, la adicción.

**Recuerda:** La adolescencia termina. No va a ser así para siempre. Tu hijo va a volver a ser cercano contigo. Pero diferente.

Tu trabajo no es ser su amigo. Es ser su guía. Aunque te odie hoy, mañana te va a agradecer.

Respira. Tú también vas a sobrevivir a esto.
`,
    
    actionItems: [
      "Hoy: Pregúntale algo sobre sus intereses (música, amigos, juegos)",
      "Toca antes de entrar a su cuarto",
      "Establece 1 límite claro esta semana (y mantente firme)",
      "Si se enoja, cuenta hasta 10 antes de responder",
      "Agenda terapia familiar si lo necesitan"
    ],
    
    tags: ["adolescencia", "teenagers", "familia", "comunicación", "cambios"],
    relatedArticles: ["article-01", "article-04"]
  },

  // ARTÍCULO 9: NIDO VACÍO
  {
    id: "article-09",
    category: "Familia",
    title: "Nido Vacío: Cuando los Hijos se Van de Casa",
    slug: "nido-vacio",
    image: "/blognidovacio.jpeg",
    imageAlt: "Pareja mayor mirando fotos de familia",
    readingTime: 2,
    preview: "Tus hijos crecieron y se fueron. La casa está vacía. Tu corazón también. Es normal sentirse así. Aquí te decimos cómo seguir adelante.",
    
    content: `
**El día que se fue tu hijo**

Durante años, tu vida giró alrededor de tus hijos. Levantarte temprano para prepararles el desayuno. Llevarlos a la escuela. Ayudarles con la tarea. Esperarlos despierto cuando salían.

Y un día, se van. A la universidad, a trabajar a otra ciudad, a formar su propia familia.

La casa está vacía. Hay silencio. Y tú no sabes qué hacer contigo.

**Es normal sentir tristeza**

Muchos padres sienten que perdieron su propósito. "Si ya no soy mamá/papá activo, ¿entonces qué soy?"

Puedes sentir:
- Tristeza profunda
- Soledad
- Que ya no eres necesario
- Nostalgia por los años que pasaron
- Miedo por tu hijo (¿estará bien solo?)

Todo eso es normal. Es un duelo. Estás perdiendo una etapa de tu vida.

**El nido vacío afecta diferente a cada uno:**

Mamás: Muchas mamás sienten que perdieron su identidad. "Yo era mamá. ¿Ahora quién soy?"

Papás: Muchos papás se arrepienten de no haber pasado más tiempo con sus hijos. "Trabajé tanto y me perdí su infancia."

Ambos: La relación de pareja cambia. Ya no tienen de qué hablar. Se dan cuenta que son extraños.

**Lo que NO debes hacer:**

Llamar a tu hijo 10 veces al día. Dale espacio para crecer.

Hacerlo sentir culpable. "Me dejaste solo." Eso no es justo para él.

Vivir tu vida a través de él. Él tiene su vida. Tú necesitas la tuya.

Negarte a soltar. Todavía querer controlarlo como si fuera niño.

Quedarte paralizado. La vida no se acabó. Hay una nueva etapa.

**Lo que SÍ debes hacer:**

1. Llora si necesitas llorar. Es sano. Es parte del proceso.

2. Redescubre a tu pareja. ¿Cuándo fue la última vez que salieron solos? ¿Que hablaron de algo que no fuera los hijos?

3. Encuentra un nuevo propósito. Esa pasión que dejaste porque no tenías tiempo. Ahora lo tienes.

4. Mantén contacto (sin asfixiar). Una llamada a la semana. Un mensaje diario. Está bien. 10 llamadas diarias, no.

5. Prepara su cuarto para cuando regrese. Pero también siéntete libre de convertirlo en algo tuyo si quieres.

**Redescubre quién eres:**

Durante 20 años fuiste mamá o papá. Pero tú eres más que eso.

¿Qué te gustaba hacer antes de tener hijos?
¿Qué dejaste de hacer por falta de tiempo?
¿Qué siempre quisiste aprender?

Ahora es tu momento. Esto no es egoísmo. Es necesario.

**Ideas para llenar el vacío:**

- Toma una clase: cocina, baile, inglés, computación
- Hazte voluntario: ayuda en un asilo, en una escuela, en una iglesia
- Viaja: aunque sea a pueblos cercanos
- Cuida tu salud: camina, haz ejercicio, come bien
- Conecta con amigos: esos que dejaste de ver porque no tenías tiempo
- Adopta una mascota: un perro o un gato pueden dar mucho amor

**Para las parejas:**

Este es el momento de volver a ser pareja, no solo papás.

Salgan a cenar. Vean una película. Platiquen. Conózcase otra vez.

Muchas parejas se divorcian cuando los hijos se van porque se dieron cuenta que ya no tienen nada en común.

No dejes que eso te pase. Trabaja en tu relación ahora.

**Para los padres solteros:**

Es más difícil para ti. No tienes pareja con quien llenar el vacío.

Pero también es una oportunidad. Por fin puedes enfocarte en ti. Sin culpa.

Mereces ser feliz. Mereces una nueva etapa. Date permiso de vivirla.

**Recuerda:** Tus hijos no se van para siempre. Volverán a visitarte. Llamarán. Te extrañarán.

Y un día, te lo van a agradecer. Van a decir: "Gracias por dejarme volar. Gracias por ser mi lugar seguro."

Tu trabajo como padre no termina. Solo cambia. Ahora eres su red de seguridad, no su guardián.

Y eso también es hermoso.
`,
    
    actionItems: [
      "Esta semana: Haz algo que siempre quisiste hacer",
      "Si tienes pareja: Agenda una cita (solo ustedes dos)",
      "Llama a un amigo que no has visto en años",
      "Apúntate a una clase o actividad nueva",
      "Si la tristeza no pasa, busca terapia"
    ],
    
    tags: ["nido vacío", "padres", "cambio", "pareja", "nueva etapa"],
    relatedArticles: ["article-04", "article-15"]
  },

  // ARTÍCULO 10: PRIMER HIJO
  {
    id: "article-10",
    category: "Familia",
    title: "Tu Primer Hijo: Todo lo que Necesitas Saber",
    slug: "primer-hijo",
    image: "/blogprimerhijo.jpeg",
    imageAlt: "Padres con bebé recién nacido",
    readingTime: 2,
    preview: "Vas a ser papá o mamá por primera vez. Tienes miedo y emoción. Es normal. Aquí está todo lo que nadie te contó.",
    
    content: `
**Vas a ser mamá o papá... ¿y ahora?**

Viste la prueba de embarazo. Dos rayitas. Estás feliz. Asustado. Emocionado. Todo al mismo tiempo.

Tu vida va a cambiar para siempre. Y está bien tener miedo.

**Nadie nace sabiendo ser papá**

No importa cuántos libros leas o videos veas. Cuando llegue tu bebé, vas a sentir que no sabes nada.

Está bien. Todos los papás empezamos así. Se aprende haciendo.

**Lo que nadie te dice sobre el embarazo:**

Para las mamás:
- Vas a estar cansada TODO el tiempo
- Vas a llorar por todo (gracias a las hormonas)
- Tu cuerpo va a cambiar y puede que no te guste
- Algunas personas van a tocar tu panza sin permiso (y está bien que les digas que no)
- Vas a tener miedo de que algo salga mal

Para los papás:
- No vas a entender todo lo que ella siente (y está bien)
- Ella va a estar emocional (no es tu culpa)
- Tú también puedes tener miedo (eso es normal)
- Tu papel es apoyar, no arreglar

**Los primeros días con tu bebé:**

Los bebés no vienen con manual. Pero aquí hay cosas básicas:

**Cómo cuidar a un recién nacido:**

1. Sostén bien su cabeza. No la pueden sostener solos los primeros meses.

2. Aliméntalo cada 2-3 horas. Van a ser noches sin dormir. Esto es temporal.

3. Cambia su pañal seguido. 8-12 pañales al día es normal.

4. Báñalo 2-3 veces por semana. No necesita baño diario.

5. Llora porque necesita algo. Hambre, pañal sucio, sueño, o solo quiere contacto.

**Lo que SÍ necesitas comprar:**

- Pañales (muchos)
- Ropa (no mucha, crecen rápido)
- Un lugar seguro donde dormir (no en tu cama los primeros meses)
- Biberones (si no das pecho)
- Pañitos para limpiar

**Lo que NO necesitas:**

- Ropa cara de diseñador (la va a usar 2 semanas)
- El cochecito más caro
- Mil juguetes (los bebés juegan con cajas)
- Todos los gadgets que anuncian

**Para las mamás: La lactancia**

La lactancia es natural, pero NO es fácil al principio. Puede doler. Puedes sentir que no produces suficiente leche.

Pide ayuda. Hay consultoras de lactancia que te pueden enseñar.

Y si al final decides dar fórmula, está bien también. Un bebé alimentado es lo importante, no cómo.

**Para los papás: Tu rol es importante**

No puedes dar pecho (obviamente). Pero sí puedes:
- Cambiar pañales
- Bañar al bebé
- Cargarlo cuando llora
- Dejar dormir a mamá
- Hacer la comida y los quehaceres

No digas "estoy ayudando". Es tu hijo también. Es tu responsabilidad.

**Los primeros meses:**

Vas a estar exhausto. No vas a dormir. Tu casa va a estar desordenada. Está bien.

Lo único que importa es que el bebé esté alimentado, limpio y amado.

Las visitas pueden esperar. La casa sucia puede esperar. Duerme cuando el bebé duerma.

**Señales de que algo no está bien (busca doctor YA):**

- Fiebre arriba de 38°C en bebés menores de 3 meses
- No moja pañales (señal de deshidratación)
- Llora inconsolable por horas
- Está muy flácido o no responde
- Vomita TODO lo que come

**Cuidando tu salud mental:**

Depresión postparto es REAL. Afecta a 1 de cada 7 mamás (y también a papás).

Si sientes:
- Tristeza profunda
- No quieres al bebé
- Piensas en lastimarte o lastimar al bebé
- No puedes dejar de llorar

BUSCA AYUDA YA. No es tu culpa. Tiene tratamiento.

**Tu relación de pareja:**

Va a estar difícil los primeros meses. Están cansados, estresados, sin sexo, sin tiempo para ustedes.

Es temporal. Hablen. Sean pacientes. Trabajen en equipo.

**Recuerda:** Nadie es perfecto. Vas a cometer errores. Todos los papás los cometemos.

Lo importante es amar a tu hijo, hacer tu mejor esfuerzo, y pedir ayuda cuando la necesites.

Tú puedes con esto. Millones de personas lo han hecho antes. Y tú también vas a lograrlo.

Bienvenido a la aventura más loca y hermosa de tu vida.
`,
    
    actionItems: [
      "Haz una lista de lo esencial que necesitas comprar",
      "Busca un pediatra ANTES de que nazca el bebé",
      "Habla con tu pareja: ¿cómo se van a dividir las tareas?",
      "Si eres mamá: Aprende sobre lactancia AHORA",
      "Descarga una app de desarrollo del bebé"
    ],
    
    tags: ["primer hijo", "bebé", "recién nacido", "padres primerizos", "embarazo"],
    relatedArticles: ["article-11", "article-04"]
  },

  // ARTÍCULO 11: SEGUNDO HIJO
  {
    id: "article-11",
    category: "Familia",
    title: "El Segundo Hijo: Cómo Manejar los Celos",
    slug: "segundo-hijo-celos",
    image: "/blogsegundohijo.jpeg",
    imageAlt: "Niño mirando a su hermanito bebé",
    readingTime: 2,
    preview: "Llega el segundo bebé y el primero no está contento. Los celos son normales. Aquí te decimos cómo manejar esto sin que nadie sufra.",
    
    content: `
**"Ya no me quieres"**

Tu hijo mayor era el rey de la casa. Toda tu atención era para él. Y de repente, llega un bebé que llora, come y duerme todo el día. Y tú ya no tienes tiempo para él.

Los celos son inevitables. Pero puedes hacer que sean menos dolorosos.

**¿Por qué el primero siente celos?**

Imagina que tu esposo llega un día y dice: "Amor, traje a otra mujer para que viva con nosotros. La voy a abrazar todo el día. Pero tú me sigues importando igual."

¿Cómo te sentirías? Pues así se siente tu hijo.

**Señales de que tu hijo mayor está celoso:**

- Vuelve a hacerse pipí (aunque ya sabía ir al baño)
- Pide biberón o chupón (aunque ya no usaba)
- Se porta mal para llamar tu atención
- Dice que quiere que el bebé se vaya
- Está agresivo con el bebé (le pega, lo pellizca)
- Está más llorón o berrinchudo

**Lo que NO debes hacer:**

Decirle "Ya eres grande, entiende"
No es grande. Sigue siendo tu niño. No entiende por qué todo cambió.

Castigarlo por portarse mal
Está pidiendo atención. Si lo castigas, va a portarse peor.

Obligarlo a querer al bebé
"Dale un beso a tu hermanito." No. El amor no se obliga.

Compararlo
"Tu hermano sí se porta bien." Eso solo crea resentimiento.

Dejarlo de lado
"Ahorita no puedo, estoy con el bebé." El mensaje que recibe es: "El bebé es más importante que tú."

**Lo que SÍ debes hacer:**

1. Tiempo individual con él (TODOS LOS DÍAS)
10 minutos de atención completa. Sin celular. Sin bebé. Solo él.

Pregúntale de su día. Juega lo que él quiera. Abrázalo.

Esos 10 minutos valen más que mil horas distraídas.

2. Involúcralo con el bebé (sin forzar)
"¿Me ayudas a traer un pañal?"
"¿Quieres cantarle una canción a tu hermanito?"

Pero si dice no, respeta. No lo obligues.

3. Celebra cuando es amable con el bebé
"Qué lindo que le hablaste bonito."
"Ví que le acariciaste la cabeza. Eres un gran hermano."

Lo que celebras, se repite.

4. Valida sus emociones
"Sé que extrañas cuando solo éramos tú y yo."
"A veces te enojas porque el bebé llora mucho. Está bien sentir eso."

No le digas que no se sienta así. Sus sentimientos son válidos.

5. Mantén sus rutinas
Si antes leían un cuento antes de dormir, sigan haciéndolo.
Si los sábados desayunaban juntos, sigan haciéndolo.

La rutina le da seguridad. Le dice: "Aunque llegó el bebé, tú sigues siendo importante."

**Para cuando el bebé sea un poco mayor:**

Los celos pueden durar años. No se van cuando el bebé tiene 1 mes.

Evita el favoritismo:
"Él es el bebé (el chiquito, el consentido)." Eso hace sentir mal al mayor.
"Tú eres el responsable." Eso es mucha carga para un niño.

Trata a cada uno como individuo, no como "el mayor" y "el menor".

**Cuando la agresión es peligrosa:**

Si el mayor lastima al bebé de verdad (no solo un empujón), necesitas intervenir.

NUNCA dejes al bebé solo con él. Nunca.

Busca ayuda profesional. Puede haber algo más profundo pasando.

**Para el papá o mamá que se siente culpable:**

Es normal sentir que le quitaste algo a tu hijo mayor. Que "le arruinaste la vida" trayendo otro bebé.

No es cierto. Los hermanos son un regalo. Al principio no lo ve así, pero con el tiempo sí.

**Recuerda:** Los celos no duran para siempre. Con paciencia, amor y atención, tus hijos van a ser amigos.

Un día, tu hijo mayor va a defender a su hermanito de otros. Va a compartir con él. Va a jugar con él.

Y tú vas a ver que todo valió la pena.
`,
    
    actionItems: [
      "HOY: 10 minutos solo con tu hijo mayor (sin bebé)",
      "Mantén al menos 1 rutina que tenían antes del bebé",
      "Celebra cuando sea amable con el bebé",
      "Dile: 'Te amo. Siempre vas a ser mi hijo especial'",
      "Si la agresión es fuerte, busca ayuda profesional"
    ],
    
    tags: ["segundo hijo", "celos", "hermanos", "familia", "crianza"],
    relatedArticles: ["article-10", "article-12"]
  },

  // ARTÍCULO 12: TERCER HIJO
  {
    id: "article-12",
    category: "Familia",
    title: "Tercer Hijo: El Caos Organizado",
    slug: "tercer-hijo-caos",
    image: "/blogtercerhijo.jpeg",
    imageAlt: "Familia numerosa feliz en casa",
    readingTime: 2,
    preview: "Con tres hijos, todo es más difícil y más bonito. Aquí te damos tips para no volverte loco y disfrutar el camino.",
    
    content: `
**De zona de hombre a zona de defensa**

Con un hijo, había tiempo. Con dos, había equilibrio. Con tres, hay caos. Hermoso caos.

Ahora están en mayoría. Oficialmente eres una familia numerosa. Y todo cambia.

**La realidad de tres hijos:**

Nunca hay silencio. Siempre alguien necesita algo. Uno tiene hambre, otro está haciendo tarea, el otro está llorando.

La casa está desordenada SIEMPRE. Acéptalo. No vas a tener una casa de revista.

Gastas más dinero. Más comida, más ropa, más pañales, más escuela, más TOOD.

Pero también... más amor, más risas, más abrazos, más memorias.

**Lo que nadie te dice sobre tres hijos:**

1. Ya no puedes usar defensa de hombre a hombre. Ahora es zona: "Tú cuidas a estos dos, yo al otro."

2. El tercero es el más relajado. Con el primero hervías el chupón. Con el tercero, si se cae al piso, solo lo enjuagas.

3. Alguien siempre se va a quedar atrás. No puedes estar con los tres al mismo tiempo.

4. Las peleas entre hermanos se multiplican. Ahora son tres los que se pelean.

5. Ya no caben en un carro normal. Necesitas una van o camioneta.

**Cómo organizarte (sin morir en el intento):**

**1. Rutinas estrictas**

Sin rutinas, es imposible. Necesitas horarios para:
- Despertarse
- Desayunar
- Bañarse
- Hacer tarea
- Cenar
- Dormir

Pega un horario en la pared. Todos lo siguen.

**2. Los mayores ayudan**

El de 8 años puede cuidar al de 4 mientras tú atiendes al bebé.
El de 6 puede poner la mesa.
El de 4 puede recoger sus juguetes.

No es explotarlos. Es enseñarles responsabilidad.

**3. Cocina para varios días**

Cocina el domingo suficiente para toda la semana. Congela. Recalienta. Listo.

No tienes tiempo de cocinar fresco todos los días.

**4. Compra al mayoreo**

Pañales, papel de baño, pasta de dientes. Todo al mayoreo. Sale más barato.

**5. Baja tus estándares**

Tu casa no va a estar perfecta. Tus hijos no van a estar peinados todos los días. Está bien.

Lo importante es que estén alimentados, amados y vivos.

**Manejando la dinámica entre hermanos:**

Con tres, siempre hay un problema:
- Dos se alían contra uno
- Uno se siente dejado fuera
- Los mayores molestan al chico
- El chico delata a los grandes

**Tips para la paz:**

Tiempo individual con cada uno (aunque sean 5 minutos al día)

No compares: "Tu hermano sí hace la tarea rápido." Cada quien es diferente.

Déjalos resolver sus problemas: No seas el juez de cada pelea. "Ustedes arréglense."

Actividades familiares: Una vez por semana, hagan algo juntos que todos disfruten.

**El rol de cada hijo:**

El mayor: Siente que tiene demasiada responsabilidad. Recuérdale que sigue siendo un niño.

El de en medio: Se siente olvidado. Dale atención especial.

El menor: Es el consentido. Pero también enséñale responsabilidad.

**Para las mamás: Es MUY cansado**

Vas a estar agotada. Física y emocionalmente. Vas a llorar. Vas a querer renunciar.

Es normal. No eres mala mamá. Es que tres hijos son MUCHO.

Pide ayuda. No puedes sola. Nadie puede sola.

**Para los papás: Tu rol es crucial**

No puedes ser el que "ayuda". Tienes que ser el que co-parentea.

Si trabajas fuera, cuando llegues, toma el relevo. Deja descansar a mamá.

**Cómo mantener tu relación de pareja:**

Con tres hijos, es fácil olvidar que son pareja. Solo son "papá y mamá".

Una vez al mes, salgan solos. Aunque sea a caminar. Sin niños.

Hablen de algo que NO sea los hijos.

Recuerden por qué se enamoraron.

**Cómo cuidar tu salud mental:**

Con tres, es fácil perderte a ti mismo. Tu vida ES tus hijos.

Pero tú también importas. Necesitas 30 minutos al día para ti.

Lee. Camina. Ve una serie. Lo que sea que te recargue.

No es egoísmo. Es necesario.

**Recuerda:** Tener tres hijos es como hacer malabares con antorchas prendidas. Difícil, caótico, peligroso.

Pero cuando lo logras, es la sensación más increíble del mundo.

Tu casa está llena. Tu corazón está lleno. Tu vida está llena.

No es fácil. Pero es hermoso.
`,
    
    actionItems: [
      "Esta semana: Crea una rutina escrita y pégala en la pared",
      "Cocina el domingo para varios días",
      "Dale 5 minutos individuales a cada hijo HOY",
      "Baja tus estándares: Una casa desordenada es una casa viva",
      "Agenda una cita con tu pareja (aunque sea en 3 semanas)"
    ],
    
    tags: ["tercer hijo", "familia numerosa", "organización", "crianza", "caos"],
    relatedArticles: ["article-11", "article-04"]
  },

  // ARTÍCULO 13: CUIDANDO A LOS ABUELITOS
  {
    id: "article-13",
    category: "Familia",
    title: "Cuidando a los Abuelitos: Amor y Paciencia",
    slug: "cuidando-abuelitos",
    image: "/blogcuidandoabuelitos.jpeg",
    imageAlt: "Mujer cuidando a su madre mayor",
    readingTime: 2,
    preview: "Tus papás cuidaron de ti. Ahora tú cuidas de ellos. Es difícil, pero es amor. Aquí te ayudamos con consejos prácticos.",
    
    content: `
**El rol se invierte**

Tus papás te cambiaron el pañal. Te dieron de comer. Te cuidaron cuando estabas enfermo. Te enseñaron a caminar.

Ahora, ellos son los que necesitan ayuda. Y tú eres el cuidador.

Es una de las cosas más difíciles que vas a hacer en tu vida. Pero también una de las más importantes.

**Los cambios que vienen con la edad:**

Olvidan cosas. Te cuentan la misma historia 5 veces. Olvidan si comieron.

Se mueven lento. Les duele todo. No pueden hacer lo que antes hacían.

Están más sensibles. Lloran fácil. Se enojan fácil. Sus emociones están a flor de piel.

Pierden independencia. Y eso les da coraje. Nadie quiere depender de otros.

**Lo que vas a sentir (y está bien):**

Frustración. Porque repites las cosas mil veces y no entienden.

Tristeza. Porque ya no son las personas fuertes que conociste.

Culpa. Porque a veces quieres que todo acabe. Y te sientes mal por sentir eso.

Cansancio. Físico y emocional. Es agotador.

Todo eso es normal. No te hace mala persona. Te hace humano.

**Lo que ellos necesitan:**

**1. Salud**
- Llévalo al doctor regularmente
- Asegúrate que tome sus medicinas
- Ayúdalo a bañarse si no puede solo
- Dale comida nutritiva (no solo lo que es fácil)

**2. Seguridad**
- Pon barandales en el baño
- Quita tapetes donde se pueda tropezar
- Pon buena luz en toda la casa
- Ten los números de emergencia a la mano

**3. Actividad**
- Que salga a caminar (si puede)
- Que hable con gente
- Que haga cosas con sus manos (tejer, dibujar, armar)
- Que NO se la pase viendo tele todo el día

**4. Dignidad**
- Déjalo hacer lo que aún puede hacer solo
- No lo trates como niño
- Escucha sus opiniones (aunque no estés de acuerdo)
- Respeta su privacidad

**5. Amor**
- Abrázalo
- Dile que lo quieres
- Escucha sus historias (aunque ya las contó antes)
- Pasa tiempo con él (no solo cuidándolo)

**Cómo cuidarlo sin destruirte:**

**1. Pide ayuda**
No puedes solo. Divide responsabilidades con tus hermanos.

Si no hay hermanos, busca ayuda pagada algunas horas.

Hay programas del gobierno que ayudan. Investiga.

**2. Toma descansos**
Si no descansas, te vas a enfermar tú.

Necesitas al menos 1 día a la semana sin responsabilidades de cuidador.

**3. Únete a un grupo de apoyo**
Hay grupos de cuidadores. Gente que entiende lo que sientes.

No estás solo. Millones están pasando por lo mismo.

**4. Cuida tu salud**
Come bien. Duerme. Haz ejercicio. Ve al doctor.

Si tú te enfermas, ¿quién va a cuidar a tu papá?

**5. Busca ayuda profesional**
Si sientes que ya no puedes más, habla con un psicólogo.

No es debilidad. Es inteligencia.

**Cuando la situación es demasiado:**

A veces, por más que ames a tu papá, no puedes cuidarlo en casa.

Si tiene demencia avanzada, si necesita cuidado médico 24/7, si está en peligro...

Tal vez necesites considerar un asilo.

Eso NO te hace mala persona. A veces, es lo mejor para él y para ti.

**Cómo hablar con ellos sobre el futuro:**

Es una conversación difícil, pero necesaria.

Pregúntales:
- ¿Qué quieres si te enfermas y no puedes decidir?
- ¿Quieres estar en un hospital con máquinas, o morir en paz?
- ¿Dónde quieres que te entierren?

Es incómodo. Pero es importante. Porque cuando llegue el momento, vas a saber qué hacer.

**El final:**

Un día, van a partir. Y vas a sentir muchas cosas.

Alivio (porque ya no sufren).
Culpa (por sentir alivio).
Tristeza profunda.
Paz (porque hiciste tu mejor esfuerzo).

**Recuerda:** Cuidar a tus papás no es una obligación. Es un privilegio.

No todos tienen la oportunidad de devolverles un poco de todo lo que ellos dieron.

No va a ser perfecto. Va a haber días malos. Va a haber días en que quieras renunciar.

Pero cuando mires atrás, vas a saber que hiciste lo correcto.

Y eso va a dar paz a tu corazón.
`,
    
    actionItems: [
      "Hoy: Abraza a tus papás y diles que los quieres",
      "Revisa la casa: ¿hay peligros? (tapetes, mala luz, etc)",
      "Haz una lista de sus medicinas y horarios",
      "Busca un grupo de apoyo para cuidadores",
      "Agenda terapia para ti si sientes que ya no puedes"
    ],
    
    tags: ["abuelitos", "tercera edad", "cuidadores", "familia", "amor"],
    relatedArticles: ["article-09", "article-15"]
  },

  // ARTÍCULO 14: DIVORCIO E HIJOS
  {
    id: "article-14",
    category: "Familia",
    title: "Divorcio: Cómo Proteger a tus Hijos del Dolor",
    slug: "divorcio-proteger-hijos",
    image: "/blogdivorcioehijos.jpeg",
    imageAlt: "Niño entre padres separados",
    readingTime: 2,
    preview: "El divorcio duele. A ti y a tus hijos. Pero puedes hacer que duela menos. Aquí te enseñamos cómo cuidar su corazón.",
    
    content: `
**Cuando el amor se acaba**

Decidiste divorciarte. Tal vez fue tu decisión. Tal vez fue de tu pareja. Tal vez los dos lo decidieron.

No importa. Lo que importa ahora es: ¿Cómo protejo a mis hijos?

**Lo primero que debes saber:**

Tus hijos VAN a sufrir. No puedes evitarlo. El divorcio duele.

Pero PUEDES hacer que duela menos. PUEDES ayudarlos a sanar. PUEDES hacer que no los marque para siempre.

**Cómo decirles que se divorcian:**

Díselo juntos (papá y mamá, si es posible). Que vean que ambos están en esto.

Usa palabras simples: "Papá y mamá ya no vamos a vivir juntos. Pero los dos los seguimos amando."

NO digas: "Ya no nos queremos." Eso los asusta. Piensan: "¿Y si un día tampoco me quieren a mí?"

Di: "Nosotros tenemos un problema. Pero tú no eres el problema. Tú no hiciste nada mal."

Dales permiso de sentir: "Está bien si estás triste. Está bien si estás enojado. Todos esos sentimientos son normales."

**Lo que NO debes hacer NUNCA:**

Hablar mal del otro papá. "Tu papá es un idiota." Eso lastima a tu hijo. Él es 50% papá, 50% mamá.

Usar a tus hijos como mensajeros. "Dile a tu papá que..." No. Habla tú con tu ex.

Hacer que elijan un lado. "¿A quién quieres más?" Eso los destroza por dentro.

Poner a tu hijo como tu confidente. "Ya no sé qué hacer con tu papá." Eso no es su responsabilidad.

Competir por su amor. "Yo te compro más cosas que tu mamá." No es una competencia.

**Lo que SÍ debes hacer:**

**1. Mantén la rutina**
Los niños necesitan estabilidad. Aunque todo cambió, algunas cosas deben seguir igual.

Mismos horarios. Misma escuela (si es posible). Mismas reglas.

**2. Asegúrales que no es su culpa**
Los niños piensan que todo es por ellos. "Tal vez se pelearon por mis calificaciones."

Diles mil veces: "Esto no es tu culpa. Nada de lo que hiciste o dijiste causó esto."

**3. No los hagas espías**
No preguntes: "¿Qué hace tu papá en su casa?" "¿Tiene novia nueva?"

Deja que tus hijos tengan su relación con cada papá sin sentirse vigilados.

**4. Respeta el tiempo del otro**
Si le toca el fin de semana al papá, respétalo. No lo cambies por cosas que no son urgentes.

Tu hijo necesita tiempo con ambos.

**5. Comunícate con tu ex (sobre los hijos)**
No tienen que ser amigos. Pero sí tienen que ser socios en la crianza.

Hablen de la escuela, la salud, las actividades. Es por el bien de los hijos.

**Señales de que tu hijo NO está bien:**

- Sus calificaciones bajan mucho
- Se orina en la cama (si ya no lo hacía)
- Está agresivo o muy retraído
- Dice que quiere morirse
- No come o come demasiado
- Tiene pesadillas

Si ves esto, busca ayuda profesional YA.

**Para niños pequeños (3-7 años):**

Piensan que todo es su culpa. Aso que siempre aclara: "No es tu culpa."

Necesitan mucha seguridad física: abrazos, caricias, cercanía.

Van a portarse mal más seguido. Es su forma de pedir atención.

**Para niños grandes (8-12 años):**

Entienden más, pero eso no significa que duela menos.

Algunos se ponen del lado de un papá. "Tú eres el bueno, mamá es la mala."

Necesitan que les des espacio para sentir, pero también estructura.

**Para adolescentes (13+):**

Pueden estar muy enojados. Contigo, con la vida, con todo.

Pueden aislarse. No querer hablar. Encerrarse en su cuarto.

No los fuerces a hablar, pero déjales saber que estás ahí.

**Cuando hay una nueva pareja:**

No introduzcas a tus hijos a tu novio/novia inmediatamente. Espera. Asegúrate que es serio.

Cuando los presentes, diles: "Esta es María. Es importante para mí. Pero nadie va a reemplazar a tu mamá."

No los obligues a querer a tu pareja. El cariño se gana con tiempo.

**Recuerda:** El divorcio no arruina a los hijos. Lo que los arruina es cómo los padres manejan el divorcio.

Puedes divorciarte de tu pareja, pero NUNCA te divorcias de tus hijos.

Ellos no perdieron una familia. Ahora tienen dos casas. Dos lugares donde los aman.

Si tú y tu ex pueden ser civilizados, tus hijos van a estar bien.

El amor de ambos es lo que importa. No si viven juntos o separados.
`,
    
    actionItems: [
      "Diles HOY: 'El divorcio no es tu culpa. Te amo.'",
      "Mantén su rutina: mismos horarios, mismas reglas",
      "NUNCA hables mal del otro papá delante de ellos",
      "Respeta el tiempo del otro papá (aunque te cueste)",
      "Si ves señales de alarma, busca terapia familiar YA"
    ],
    
    tags: ["divorcio", "separación", "hijos", "familia", "crianza"],
    relatedArticles: ["article-01", "article-15"]
  },

  // ARTÍCULO 15: SANANDO RELACIONES FAMILIARES
  {
    id: "article-15",
    category: "Familia",
    title: "Sanando Relaciones Familiares: Nunca es Tarde",
    slug: "sanar-relaciones-familiares",
    image: "/blogconstelacionesfamilialres.jpeg",
    imageAlt: "Familia abrazándose y reconciliándose",
    readingTime: 2,
    preview: "Peleas viejas, rencores guardados, años sin hablarse. ¿Se puede arreglar? Sí. Aquí te mostramos cómo dar el primer paso.",
    
    content: `
**Años sin hablarse**

Hace 5, 10, 20 años que no hablas con tu hermano. O con tu papá. O con tu hijo.

Pasó algo. Se dijeron cosas feas. Alguien hizo algo que dolió. Y nunca se arregló.

El tiempo pasó. El coraje se quedó. Y ahora ya ni te acuerdas bien por qué están peleados.

**¿Vale la pena arreglarlo?**

Sí. Siempre vale la pena. Por tres razones:

1. La vida es corta. Un día, esa persona va a morir. Y vas a vivir con el "hubiera".

2. El rencor te enferma. Literalmente. El coraje guardado te da presión alta, te hace dormir mal, te amarga.

3. El perdón es para ti, no para el otro. Perdonar no significa "lo que hiciste estuvo bien". Significa "ya no voy a cargar con esto".

**Por qué es tan difícil perdonar:**

Porque duele. Porque sientes que si perdonas, estás diciendo que lo que te hicieron no importa.

Porque tienes miedo. ¿Y si vuelve a pasar?

Porque el orgullo no te deja. "Yo no voy a hablarle primero."

Pero el orgullo no te abraza en la noche. El orgullo no te cuida cuando estás viejo. El orgullo no vale la pena.

**Cómo empezar a sanar:**

**1. Pregúntate: ¿Qué gano con no perdonar?**

La respuesta honesta es: nada. Solo dolor.

**2. Escribe lo que sientes**

No lo vas a mandar. Es solo para ti. Escribe todo lo que te duele, lo que te enoja, lo que extrañas.

Cuando termines, quémalo o rómpelo. Es simbólico. Estás soltando.

**3. Decide: ¿Quiero arreglar esto?**

No tienes que olvidar. No tienes que confiar al 100%. Pero, ¿quieres intentarlo?

Si la respuesta es sí, sigue leyendo.

**Cómo dar el primer paso:**

**1. Haz contacto (sin esperar nada)**

Un mensaje simple: "Hola, he estado pensando en ti. ¿Cómo estás?"

No digas todavía "te perdono" o "necesito que hablemos". Eso asusta. Empieza suave.

**2. Si responde, sigue la conversación**

Pregunta cosas simples. De su vida. Su trabajo. Sus hijos. Sin tocar el tema de la pelea. Todavía.

**3. Cuando ya hayan hablado un poco, propón verse**

"¿Te gustaría que nos veamos? Podemos tomar un café."

Un lugar público. Neutral. Sin niños (todavía). Solo ustedes dos.

**4. En esa conversación, habla con el corazón**

"Sé que ha pasado mucho tiempo. Sé que nos lastimamos. Quiero que sepas que te extraño."

No empieces con reclamos. Empieza con amor.

**5. Escucha su versión**

Aunque no estés de acuerdo. Aunque sientas que está equivocado. Escucha.

Todos tenemos nuestra versión. Y todas son válidas.

**6. Pide perdón por tu parte**

Porque siempre hay dos lados. "Siento haberte dicho eso." "Siento no haber estado ahí."

No importa si tú crees que el otro tiene más culpa. Empieza por tu parte.

**7. Establece límites para el futuro**

"Quiero que volvamos a hablarnos. Pero necesito que no vuelvas a..."

Está bien poner límites. El perdón no significa permitir que te vuelvan a lastimar.

**Si la otra persona no quiere:**

A veces, das el primer paso y la otra persona no está lista. Te dice que no. Te ignora. Te rechaza.

Duele. Mucho.

Pero ya hiciste tu parte. La conciencia está tranquila.

Tal vez más adelante cambie de opinión. Tal vez no. No está en tu control.

Lo que sí está en tu control es: ya no vas a vivir con el "hubiera".

**Sanando la relación con tus papás:**

Si la relación con tus papás está rota, es diferente. Porque ellos son tus papás. Y siempre va a doler más.

Tal vez te maltrataron. Tal vez te abandonaron. Tal vez te decepcionaron.

Está bien estar enojado. Pero cargarlo toda tu vida te hace daño a ti, no a ellos.

No tienes que volver a vivir con ellos. No tienes que confiar ciegamente. Pero sí puedes perdonar.

Por tu paz.

**Sanando la relación con tus hijos:**

Si tu hijo no te habla, el dolor es inmenso. Es tu hijo. Tu bebé. Aunque tenga 30 años.

Tal vez cometiste errores. Todos los papás cometemos errores.

Haz contacto. Pide perdón. Di: "No fui el papá/mamá perfecto. Pero te amo. Y quiero arreglarlo."

Aunque te rechace, sigue intentando. Una vez al mes. Un mensaje. "Estoy aquí cuando estés listo."

**Recuerda:** La familia es imperfecta. Todos lastimamos. Todos somos lastimados.

Pero la familia también puede sanar. Con amor, con tiempo, con perdón.

No esperes el momento perfecto. No esperes a que el otro de el primer paso.

La vida es hoy. Haz esa llamada. Manda ese mensaje.

Tal vez sea el principio de algo hermoso.
`,
    
    actionItems: [
      "HOY: Escribe una lista de personas con las que quieres hacer las paces",
      "Elige UNA persona de esa lista",
      "Mándale un mensaje simple: 'Hola, he pensado en ti'",
      "Si no responde en 1 mes, inténtalo una vez más",
      "Si aún así no responde, suelta. Ya hiciste tu parte"
    ],
    
    tags: ["familia", "perdón", "reconciliación", "sanación", "relaciones"],
    relatedArticles: ["article-05", "article-14"]
  },

  // ARTÍCULO 16: CONSTELACIONES FAMILIARES
  {
    id: "article-16",
    category: "Bienestar",
    title: "Constelaciones Familiares: Sanando el Árbol de tu Familia",
    slug: "constelaciones-familiares",
    image: "/blogconstelacion_familiar.jpeg",
    imageAlt: "Personas en círculo en terapia grupal",
    readingTime: 2,
    preview: "Los problemas de tu familia vienen de generaciones atrás. Las constelaciones familiares ayudan a sanar esas heridas. Te explicamos cómo.",
    
    content: `
**El dolor que se hereda**

¿Sabías que puedes estar cargando con problemas que no son tuyos?

Tu abuela tuvo un dolor. No lo sanó. Se lo pasó a tu mamá. Tu mamá no lo sanó. Te lo pasó a ti.

Y ahora tú cargas con algo que ni siquiera empezó contigo.

Esto es lo que llaman "heridas transgeneracionales". Y las constelaciones familiares te ayudan a sanarlas.

**¿Qué son las constelaciones familiares?**

Es una terapia grupal donde trabajas tu árbol familiar.

No solo tú y tus papás. Tu árbol completo: abuelos, bisabuelos, tíos, primos. Todos.

La idea es que en las familias hay "lealtades invisibles". Repetimos patrones sin darnos cuenta.

**Patrones que se repiten en las familias:**

**Abandono:** Tu abuelo abandonó a tu papá. Tu papá te abandonó. Ahora tú abandonas tus relaciones.

**Violencia:** Tu bisabuelo golpeaba. Tu abuelo golpeaba. Tu papá golpea. Ahora tú golpeas.

**Pobreza:** Tu familia siempre ha sido pobre. Y aunque tú ganes bien, siempre terminas sin dinero.

**Enfermedad:** Todos en tu familia tienen diabetes, depresión, o cáncer. Como si fuera un "destino".

**Muerte temprana:** Varios hombres en tu familia murieron jóvenes. Y tú sientes que también te va a pasar.

**¿Por qué repetimos estos patrones?**

Porque es lo que conocemos. Porque sentimos una "lealtad" invisible con nuestra familia.

En el fondo piensas: "Si mi papá sufrió, yo también debo sufrir."

Es inconsciente. No lo haces a propósito. Pero lo haces.

**¿Cómo funciona una constelación familiar?**

**1. Llegas al taller**
Hay un grupo de 15-20 personas. Y hay un facilitador (el terapeuta).

**2. Cuentas tu problema**
"No puedo tener una relación estable."
"Siempre termino sin dinero."
"Siento que no merezco ser feliz."

**3. Eliges representantes**
Otras personas del grupo van a representar a tu familia. Uno es tu papá. Otro tu mamá. Otro tú.

Tú te sientas y solo observas.

**4. Los representantes sienten lo que tu familia siente**
Esto es lo más increíble. Los representantes empiezan a sentir emociones que no son suyas.

El que representa a tu papá siente coraje. El que representa a tu mamá siente tristeza.

**5. El facilitador ayuda a resolver**
El terapeuta mueve a las personas. Les hace decir frases sanadoras.

"Mamá, te dejo tu dolor. Yo tomo mi vida."
"Papá, te respeto. Pero yo voy a ser diferente."

**6. Tú sanas**
Aunque solo estabas viendo, algo se mueve dentro de ti. Algo se suelta. Algo se sana.

**¿Cómo puede funcionar esto?**

La ciencia no lo entiende completamente. Pero funciona.

Tal vez es la epigenética (los traumas se graban en los genes). Tal vez es energía. Tal vez es algo que aún no entendemos.

Lo importante es: muchas personas reportan cambios después de una constelación.

**Señales de que tienes heridas transgeneracionales:**

- Repites los mismos problemas que tus papás o abuelos
- Sientes que cargas con algo que no es tuyo
- Hay secretos en tu familia (un hijo no reconocido, un suicidio, un aborto)
- Sientes lealtad hacia alguien que te hizo daño
- No puedes avanzar en tu vida sin razón aparente

**Frases sanadoras que puedes usar:**

"Mamá, te respeto. Pero mi vida es mía."

"Papá, te dejo tu dolor. Yo tomo lo bueno que me diste."

"Abuela, gracias por tu sacrificio. Pero yo voy a vivir diferente."

"Familia, los honro. Pero yo no voy a repetir sus errores."

**¿Dónde puedo hacer una constelación?**

Busca "constelaciones familiares" + tu ciudad.

Hay talleres grupales (más baratos) y sesiones individuales (más caras).

El precio varía. Pero generalmente es accesible.

**¿Es para todos?**

No. Si estás en crisis (muy deprimido, con ideas suicidas), primero necesitas terapia individual.

Las constelaciones son para trabajar patrones familiares profundos. No para crisis inmediatas.

**¿Realmente funciona?**

Hay gente que dice que cambió su vida. Hay gente que dice que no sintió nada.

Como toda terapia, funciona si estás abierto. Si vas con escepticismo total, probablemente no te ayude.

Pero si vas con el corazón abierto, puede ser muy poderoso.

**Recuerda:** No estás destinado a repetir los errores de tu familia.

Puedes romper el ciclo. Puedes sanar lo que ellos no sanaron. Puedes ser diferente.

Tu árbol familiar tiene raíces profundas. Algunas sanas, algunas enfermas.

Tu trabajo es: cortar las ramas enfermas. Regar las sanas. Y crear ramas nuevas para las siguientes generaciones.

Tus hijos no tienen que cargar lo que tú cargaste.

Eso empieza contigo. Hoy.
`,
    
    actionItems: [
      "Dibuja tu árbol familiar (hasta abuelos al menos)",
      "Identifica 1 patrón que se repite en tu familia",
      "Busca 'constelaciones familiares' en tu ciudad",
      "Lee sobre tu historia familiar: pregúntale a tus tíos, abuelos",
      "Di en voz alta: 'Yo no voy a repetir los errores de mi familia'"
    ],
    
    tags: ["constelaciones", "terapia", "familia", "sanación", "patrones"],
    relatedArticles: ["article-02", "article-15"]
  }
];
