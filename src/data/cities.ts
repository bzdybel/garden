/**
 * Lokalizacje z dedykowanymi stronami lokalnymi (/obszar-dzialania/[slug]/).
 * Każde miasto MUSI mieć unikalny opis – Google karze za strony-klony (doorway pages).
 * Dodawaj miasta dopiero, gdy masz w nich realizacje lub realny popyt.
 * TODO: listy miejscowości i odległości do weryfikacji przez firmę.
 */
export type City = {
  slug: string;
  name: string;
  /** Forma w miejscowniku: "w Radomiu" */
  locative: string;
  county: string;
  /** Urząd przyjmujący zgłoszenia budowlane */
  authority: string;
  distanceKm: number;
  intro: string;
  local: string;
  areas: string[];
};

export const cities: City[] = [
  {
    slug: 'radom',
    name: 'Radom',
    locative: 'w Radomiu',
    county: 'Radom (miasto na prawach powiatu)',
    authority: 'Urząd Miejski w Radomiu',
    distanceKm: 0,
    intro:
      'Radom to nasza baza – stąd wyjeżdżają ekipy montażowe i tu mieści się stolarnia. Budujemy zarówno na dużych działkach na Wośnikach, Kapturze czy Józefowie, jak i w kameralnych ogródkach przy szeregowcach na Gołębiowie i Michałowie.',
    local:
      'W zabudowie miejskiej liczy się każdy metr – dlatego projektujemy zadaszenia tarasów dopasowane do elewacji i altany o niestandardowych wymiarach, które mieszczą się w limitach zwolnionych z formalności. Przy segmentach pomagamy też w uzgodnieniach z sąsiadami i wspólnotą.',
    areas: ['Gołębiów', 'Wośniki', 'Kaptur', 'Józefów', 'Michałów', 'Borki', 'Malczew', 'Ustronie'],
  },
  {
    slug: 'jedlnia-letnisko',
    name: 'Jedlnia-Letnisko',
    locative: 'w Jedlni-Letnisku',
    county: 'powiat radomski',
    authority: 'Starostwo Powiatowe w Radomiu',
    distanceKm: 12,
    intro:
      'Jedlnia-Letnisko to działki wśród sosnowych lasów, gdzie altana jest naturalnym przedłużeniem domu. Klienci najczęściej zamawiają tu altany otwarte z dużym okapem i pergole wkomponowane między drzewa.',
    local:
      'Na piaszczystym gruncie i działkach z wysokimi sosnami stosujemy wkręty fundamentowe zamiast betonu – nie uszkadzają korzeni i nie wymagają kopania. Rynny wyposażamy w siatki chroniące przed igliwiem.',
    areas: ['Jedlnia-Letnisko', 'Jedlanka', 'Myśliszewice', 'Siczki', 'Cudnów', 'Gzowice'],
  },
  {
    slug: 'pionki',
    name: 'Pionki',
    locative: 'w Pionkach',
    county: 'powiat radomski',
    authority: 'Starostwo Powiatowe w Radomiu',
    distanceKm: 22,
    intro:
      'Pionki i okolice leżą na skraju Puszczy Kozienickiej. Dominują tu domy z dużymi ogrodami i kominkami – stąd częste zamówienia na wiaty samochodowe połączone z drewutnią.',
    local:
      'Na działkach graniczących z lasem projektujemy dachy z większym spadkiem i łatwym dostępem do rynien, żeby liście i gałęzie nie zalegały na pokryciu. Drewutnie ustawiamy frontem do słońca, żeby drewno szybciej schło.',
    areas: ['Pionki', 'Jedlnia', 'Suskowola', 'Sokoły'],
  },
  {
    slug: 'kozienice',
    name: 'Kozienice',
    locative: 'w Kozienicach',
    county: 'powiat kozienicki',
    authority: 'Starostwo Powiatowe w Kozienicach',
    distanceKm: 32,
    intro:
      'Kozienice, Garbatka-Letnisko i okolice Puszczy Kozienickiej to rejon domów letniskowych i całorocznych z przestronnymi działkami. Budujemy tu altany z kuchnią letnią i zadaszenia tarasów, które pozwalają korzystać z ogrodu od wiosny do jesieni.',
    local:
      'W niektórych lokalizacjach bliżej Wisły poziom wód gruntowych jest wyższy – wtedy stopy fundamentowe wykonujemy z drenażem i obsypką żwirową, a słupy montujemy na kotwach odsuniętych od podłoża.',
    areas: ['Kozienice', 'Świerże Górne', 'Janików', 'Garbatka-Letnisko', 'Gniewoszów'],
  },
  {
    slug: 'skaryszew',
    name: 'Skaryszew',
    locative: 'w Skaryszewie',
    county: 'powiat radomski',
    authority: 'Starostwo Powiatowe w Radomiu',
    distanceKm: 15,
    intro:
      'Skaryszew i gminy na południowy wschód od Radomia to duże działki siedliskowe, na których potrzeba więcej miejsca pod dachem – budujemy tu wiaty wielostanowiskowe, wiaty na sprzęt ogrodowy i zadaszone miejsca do przyjmowania gości.',
    local:
      'Przy wiatach o większej rozpiętości stosujemy belki z drewna klejonego BSH, dzięki czemu można zrezygnować ze słupów pośrodku i swobodnie wjechać autem, przyczepą czy traktorkiem.',
    areas: ['Skaryszew', 'Kowala', 'Wierzbica', 'Gębarzów'],
  },
  {
    slug: 'szydlowiec',
    name: 'Szydłowiec',
    locative: 'w Szydłowcu',
    county: 'powiat szydłowiecki',
    authority: 'Starostwo Powiatowe w Szydłowcu',
    distanceKm: 30,
    intro:
      'Szydłowiec słynie z piaskowca, a nasi klienci z okolic chętnie łączą drewno z kamieniem – altany na kamiennej podmurówce, grille i blaty z lokalnego piaskowca to tutaj częste zamówienie.',
    local:
      'Współpracujemy z lokalnymi kamieniarzami, dzięki czemu kamienne elementy altany i drewniana konstrukcja powstają w jednym, spójnym projekcie – z odpowiednią izolacją między kamieniem a drewnem.',
    areas: ['Szydłowiec', 'Orońsko', 'Chlewiska', 'Jastrząb', 'Mirów'],
  },
];

export const extraArea = ['Białobrzegi', 'Zwoleń', 'Iłża', 'Jedlińsk', 'Zakrzew', 'Gózd', 'Wolanów', 'Przytyk', 'Jastrzębia'];
