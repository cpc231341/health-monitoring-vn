// Equipamentos usados em missões reais para medir pressão, glicose e peso.
// São referências para o astronauta e para a equipe: neste protótipo a medição é manual ou pelo anel.
// `kind`: spot (leitura pontual), continuous (contínuo) ou wearable (vestível).
// Os nomes são nomes próprios e não mudam de idioma. As descrições ficam em EQUIP_TEXT, por idioma.
export const EQUIPMENT = {
  pa: [
    { id: 'tempus', name: 'Tempus Pro (kit CHeCS)', kind: 'spot', src: 'NASA' },
    { id: 'finapres', name: 'Portapres / Finapres', kind: 'continuous', src: 'NASA' },
    { id: 'biomonitor', name: 'Bio-Monitor', kind: 'wearable', src: 'CSA' }
  ],
  gl: [
    { id: 'istat', name: 'i-STAT', kind: 'spot', src: 'NASA' },
    { id: 'cgm', name: 'Dexcom G6 (CGM)', kind: 'continuous', src: 'ISS National Lab' }
  ],
  kg: [
    { id: 'slammd', name: 'SLAMMD', kind: 'spot', src: 'NASA' },
    { id: 'bmmd', name: 'BMMD', kind: 'spot', src: 'Roscosmos' }
  ]
};

// Textos por idioma. Mesmas chaves em todos os idiomas (conferido em equipamentos.test.js).
export const EQUIP_TEXT = {
  pt: {
    title: 'Equipamentos usados no espaço',
    kinds: { spot: 'Leitura pontual', continuous: 'Contínuo', wearable: 'Vestível' },
    source: 'Fonte',
    note: 'São equipamentos de missões reais, para referência. Neste protótipo a medição é manual ou pelo anel.',
    weight: {
      name: 'Peso corporal (massa)',
      intro: 'No espaço o corpo não tem peso, só massa. Por isso se mede a massa, em kg. Acompanhá-la mostra se a alimentação cobre o gasto de energia.',
      how: [
        'Prenda-se ao aparelho de massa corporal, como no procedimento do equipamento da estação.',
        'Fique parado e relaxado, sem se impulsionar.',
        'Deixe o aparelho medir e anote o valor em kg.',
        'Meça no mesmo horário, de preferência antes de comer.'
      ]
    },
    desc: {
      tempus: 'Braçadeira inflável como a dos hospitais, no kit médico de bordo. Serve para leituras pontuais.',
      finapres: 'Manguitos pequenos no dedo, com bomba de ar. Medem a pressão batimento a batimento, em pesquisas.',
      biomonitor: 'Camiseta com sensores. Acompanha a pressão e outros sinais durante o sono e o exercício, sem atrapalhar o movimento.',
      istat: 'Picada no dedo e cartucho com uma gota de sangue. Lê glicose, eletrólitos e gases.',
      cgm: 'Sensor com um microfilamento sob a pele. Mede a glicose do líquido intersticial em tempo real. Já foi testado na Polaris Dawn e na ISS.',
      slammd: 'Molas empurram o astronauta com uma força conhecida e um sensor óptico mede a aceleração. Com F = m·a, o aparelho calcula a massa, com precisão de cerca de 0,2 kg.',
      bmmd: 'Aparelho russo que mede a massa pela oscilação de uma mola.'
    }
  },
  en: {
    title: 'Equipment used in space',
    kinds: { spot: 'Spot reading', continuous: 'Continuous', wearable: 'Wearable' },
    source: 'Source',
    note: 'Equipment from real missions, for reference. In this prototype, measurements are manual or from the ring.',
    weight: {
      name: 'Body weight (mass)',
      intro: 'In space the body has no weight, only mass. That is why mass is measured, in kg. Tracking it shows whether food intake covers the energy you burn.',
      how: [
        "Secure yourself to the body mass device, following the station's procedure for it.",
        'Stay still and relaxed, without pushing off.',
        'Let the device measure and note the value in kg.',
        'Measure at the same time each day, ideally before eating.'
      ]
    },
    desc: {
      tempus: 'Inflatable cuff like the ones in hospitals, part of the onboard medical kit. For spot readings.',
      finapres: 'Small finger cuffs with an air pump. They measure blood pressure beat by beat, in research.',
      biomonitor: 'A shirt with sensors. It tracks blood pressure and other signs during sleep and exercise without getting in the way.',
      istat: 'A finger prick and a cartridge with one drop of blood. It reads glucose, electrolytes and blood gases.',
      cgm: 'A sensor with a tiny filament under the skin. It measures glucose in interstitial fluid in real time. Tested on Polaris Dawn and on the ISS.',
      slammd: 'Springs push the astronaut with a known force and an optical sensor measures the acceleration. With F = m·a, the device works out the mass, accurate to about 0.2 kg.',
      bmmd: 'A Russian device that measures mass from the oscillation of a spring.'
    }
  },
  es: {
    title: 'Equipos usados en el espacio',
    kinds: { spot: 'Lectura puntual', continuous: 'Continuo', wearable: 'Prenda' },
    source: 'Fuente',
    note: 'Equipos de misiones reales, como referencia. En este prototipo la medición es manual o con el anillo.',
    weight: {
      name: 'Peso corporal (masa)',
      intro: 'En el espacio el cuerpo no tiene peso, solo masa. Por eso se mide la masa, en kg. Seguirla muestra si la comida cubre el gasto de energía.',
      how: [
        'Sujétate al aparato de masa corporal, según el procedimiento del equipo de la estación.',
        'Quédate quieto y relajado, sin impulsarte.',
        'Deja que el aparato mida y anota el valor en kg.',
        'Mide a la misma hora, preferiblemente antes de comer.'
      ]
    },
    desc: {
      tempus: 'Brazalete inflable como los de los hospitales, en el botiquín médico de a bordo. Sirve para lecturas puntuales.',
      finapres: 'Pequeños manguitos en el dedo, con bomba de aire. Miden la presión latido a latido, en investigación.',
      biomonitor: 'Camiseta con sensores. Sigue la presión y otras señales durante el sueño y el ejercicio, sin estorbar el movimiento.',
      istat: 'Pinchazo en el dedo y un cartucho con una gota de sangre. Lee glucosa, electrolitos y gases.',
      cgm: 'Sensor con un microfilamento bajo la piel. Mide la glucosa del líquido intersticial en tiempo real. Ya se probó en la Polaris Dawn y en la ISS.',
      slammd: 'Unos resortes empujan al astronauta con una fuerza conocida y un sensor óptico mide la aceleración. Con F = m·a, el aparato calcula la masa, con una precisión de unos 0,2 kg.',
      bmmd: 'Aparato ruso que mide la masa por la oscilación de un resorte.'
    }
  },
  de: {
    title: 'Im Weltraum verwendete Geräte',
    kinds: { spot: 'Einzelmessung', continuous: 'Kontinuierlich', wearable: 'Am Körper getragen' },
    source: 'Quelle',
    note: 'Geräte aus echten Missionen, zur Orientierung. In diesem Prototyp wird manuell oder mit dem Ring gemessen.',
    weight: {
      name: 'Körpergewicht (Masse)',
      intro: 'Im Weltraum hat der Körper kein Gewicht, nur Masse. Deshalb wird die Masse in kg gemessen. Ihr Verlauf zeigt, ob die Nahrung den Energieverbrauch deckt.',
      how: [
        'Befestige dich am Gerät zur Massenmessung, wie im Verfahren der Station beschrieben.',
        'Bleib ruhig und entspannt, ohne dich abzustoßen.',
        'Lass das Gerät messen und notiere den Wert in kg.',
        'Miss immer zur gleichen Zeit, am besten vor dem Essen.'
      ]
    },
    desc: {
      tempus: 'Aufblasbare Manschette wie im Krankenhaus, Teil der medizinischen Bordausrüstung. Für Einzelmessungen.',
      finapres: 'Kleine Fingermanschetten mit Luftpumpe. Sie messen den Blutdruck Schlag für Schlag, in der Forschung.',
      biomonitor: 'Shirt mit Sensoren. Erfasst Blutdruck und andere Werte im Schlaf und beim Training, ohne die Bewegung zu stören.',
      istat: 'Stich in den Finger und eine Kartusche mit einem Tropfen Blut. Misst Glukose, Elektrolyte und Blutgase.',
      cgm: 'Sensor mit einem feinen Filament unter der Haut. Misst die Glukose der Gewebeflüssigkeit in Echtzeit. Wurde bei Polaris Dawn und auf der ISS getestet.',
      slammd: 'Federn schieben den Astronauten mit bekannter Kraft an, ein optischer Sensor misst die Beschleunigung. Mit F = m·a berechnet das Gerät die Masse, auf etwa 0,2 kg genau.',
      bmmd: 'Russisches Gerät, das die Masse über die Schwingung einer Feder misst.'
    }
  },
  fr: {
    title: 'Équipements utilisés dans l’espace',
    kinds: { spot: 'Mesure ponctuelle', continuous: 'Continu', wearable: 'Vêtement connecté' },
    source: 'Source',
    note: 'Équipements de vraies missions, à titre de référence. Dans ce prototype, la mesure est manuelle ou faite avec l’anneau.',
    weight: {
      name: 'Poids corporel (masse)',
      intro: 'Dans l’espace, le corps n’a pas de poids, seulement une masse. On mesure donc la masse, en kg. La suivre montre si l’alimentation couvre la dépense d’énergie.',
      how: [
        'Attachez-vous à l’appareil de mesure de la masse, selon la procédure de la station.',
        'Restez immobile et détendu, sans vous pousser.',
        'Laissez l’appareil mesurer et notez la valeur en kg.',
        'Mesurez à la même heure, de préférence avant de manger.'
      ]
    },
    desc: {
      tempus: 'Brassard gonflable comme à l’hôpital, dans la trousse médicale de bord. Pour des mesures ponctuelles.',
      finapres: 'Petits brassards au doigt, avec une pompe à air. Ils mesurent la pression battement par battement, pour la recherche.',
      biomonitor: 'T-shirt à capteurs. Suit la pression et d’autres signes pendant le sommeil et l’exercice, sans gêner les mouvements.',
      istat: 'Piqûre au doigt et cartouche avec une goutte de sang. Lit la glycémie, les électrolytes et les gaz du sang.',
      cgm: 'Capteur avec un microfilament sous la peau. Mesure le glucose du liquide interstitiel en temps réel. Testé lors de Polaris Dawn et sur l’ISS.',
      slammd: 'Des ressorts poussent l’astronaute avec une force connue et un capteur optique mesure l’accélération. Avec F = m·a, l’appareil calcule la masse, à environ 0,2 kg près.',
      bmmd: 'Appareil russe qui mesure la masse grâce à l’oscillation d’un ressort.'
    }
  },
  it: {
    title: 'Apparecchiature usate nello spazio',
    kinds: { spot: 'Misura singola', continuous: 'Continuo', wearable: 'Indossabile' },
    source: 'Fonte',
    note: 'Apparecchiature di missioni reali, a titolo di riferimento. In questo prototipo la misura è manuale o con l’anello.',
    weight: {
      name: 'Peso corporeo (massa)',
      intro: 'Nello spazio il corpo non ha peso, solo massa. Per questo si misura la massa, in kg. Seguirla mostra se l’alimentazione copre il consumo di energia.',
      how: [
        'Fissati al dispositivo per la massa corporea, seguendo la procedura della stazione.',
        'Resta fermo e rilassato, senza darti spinte.',
        'Lascia che il dispositivo misuri e annota il valore in kg.',
        'Misura sempre alla stessa ora, meglio prima di mangiare.'
      ]
    },
    desc: {
      tempus: 'Bracciale gonfiabile come quelli degli ospedali, nel kit medico di bordo. Serve per misure singole.',
      finapres: 'Piccoli bracciali al dito, con una pompa d’aria. Misurano la pressione battito per battito, nella ricerca.',
      biomonitor: 'Maglietta con sensori. Segue la pressione e altri segnali durante il sonno e l’esercizio, senza intralciare i movimenti.',
      istat: 'Puntura al dito e cartuccia con una goccia di sangue. Legge glucosio, elettroliti e gas.',
      cgm: 'Sensore con un microfilamento sotto la pelle. Misura il glucosio del liquido interstiziale in tempo reale. Provato su Polaris Dawn e sulla ISS.',
      slammd: 'Delle molle spingono l’astronauta con una forza nota e un sensore ottico misura l’accelerazione. Con F = m·a, il dispositivo calcola la massa, con una precisione di circa 0,2 kg.',
      bmmd: 'Dispositivo russo che misura la massa tramite l’oscillazione di una molla.'
    }
  },
  ja: {
    title: '宇宙で使われる機器',
    kinds: { spot: '単発測定', continuous: '連続測定', wearable: '着用型' },
    source: '出典',
    note: '実際のミッションで使われている機器を参考として紹介しています。このプロトタイプでは、手入力またはリングで測定します。',
    weight: {
      name: '体重（質量）',
      intro: '宇宙では体に重さはなく、質量だけがあります。そのため質量をkgで測ります。変化を追うと、食事がエネルギー消費に足りているかがわかります。',
      how: [
        '体重（質量）測定装置に体を固定します。ステーションの手順に従ってください。',
        '動かずにリラックスし、反動をつけないでください。',
        '装置が測定するのを待ち、値をkgで記録します。',
        '毎回同じ時間に、できれば食事の前に測ります。'
      ]
    },
    desc: {
      tempus: '病院と同じ膨らむ腕帯で、船内の医療キットに入っています。単発の測定用です。',
      finapres: '指に巻く小型のカフとエアポンプ。研究で、拍動ごとの血圧を測ります。',
      biomonitor: 'センサー付きのシャツ。動きを妨げずに、睡眠中や運動中の血圧などを記録します。',
      istat: '指を刺して、血液1滴をカートリッジで分析します。血糖、電解質、血中ガスを測れます。',
      cgm: '皮下に細いフィラメントを入れるセンサー。間質液のグルコースをリアルタイムで測ります。ポラリス・ドーンとISSで試験されました。',
      slammd: 'ばねが既知の力で宇宙飛行士を押し、光学センサーが加速度を測ります。F = m·a から質量を計算し、精度は約0.2 kgです。',
      bmmd: 'ばねの振動から質量を測るロシアの装置です。'
    }
  }
};
