/**
 * Miasta z dedykowanymi stronami lokalnymi (/obszar-dzialania/[slug]/).
 * Siedziba firmy jest w Radomiu, montaż wykonujemy w całej Polsce.
 * Każde miasto MUSI mieć unikalny opis – Google karze za strony-klony (doorway pages).
 * Dodawaj miasta, gdy masz w nich realizacje lub realny popyt; najlepiej z własnymi zdjęciami.
 * TODO: treści do weryfikacji przez firmę, docelowo uzupełnić o realizacje z danego miasta.
 */
export type City = {
  slug: string;
  name: string;
  /** Forma w miejscowniku: "w Radomiu" */
  locative: string;
  region: string;
  /** Organ przyjmujący zgłoszenia robót budowlanych */
  authority: string;
  /** Siedziba firmy */
  headquarters?: boolean;
  intro: string;
  local: string;
  /** Dzielnice i miejscowości w okolicy */
  areas: string[];
};

export const cities: City[] = [
  {
    slug: 'radom',
    name: 'Radom',
    locative: 'w Radomiu',
    region: 'województwo mazowieckie',
    authority: 'Prezydent Miasta Radomia – wydział architektury i budownictwa urzędu miasta',
    headquarters: true,
    intro:
      'W Radomiu mamy siedzibę i biuro projektowe – stąd koordynujemy montaże w całej Polsce. Klientom z Radomia i okolic możemy pokazać próbki profili, kolorów RAL i wypełnień na miejscu.',
    local:
      'W Radomiu najczęściej projektujemy zadaszenia SMART przy domach na Wośnikach, Kapturze i Józefowie oraz pergole przy nowych domach w gminach Jedlnia-Letnisko i Zakrzew. Bliskość siedziby oznacza krótkie terminy pomiaru i serwisu.',
    areas: ['Wośniki', 'Kaptur', 'Józefów', 'Gołębiów', 'Jedlnia-Letnisko', 'Zakrzew', 'Skaryszew', 'Kozienice'],
  },
  {
    slug: 'warszawa',
    name: 'Warszawa',
    locative: 'w Warszawie',
    region: 'województwo mazowieckie',
    authority: 'urząd dzielnicy m.st. Warszawy właściwej dla lokalizacji – wydział architektury i budownictwa',
    intro:
      'Warszawa i podwarszawskie miejscowości to rynek, na którym klienci oczekują architektury, a nie „zadaszenia z marketu”. Projektujemy tu systemy T-LINE i SKYLINE dopasowane do nowoczesnych willi i segmentów.',
    local:
      'Na Wilanowie, w Konstancinie-Jeziornie czy Józefowie dominuje nowoczesna zabudowa z dużymi przeszkleniami – dlatego często proponujemy dach ze szkła i ukryty spadek SKYLINE. W zabudowie szeregowej na Białołęce czy w Ząbkach dobrze sprawdzają się zadaszenia T-LINE z zabudową boczną od strony sąsiada.',
    areas: ['Wilanów', 'Mokotów', 'Białołęka', 'Wawer', 'Konstancin-Jeziorna', 'Piaseczno', 'Józefów', 'Łomianki', 'Ząbki'],
  },
  {
    slug: 'krakow',
    name: 'Kraków',
    locative: 'w Krakowie',
    region: 'województwo małopolskie',
    authority: 'Prezydent Miasta Krakowa – wydział architektury i budownictwa urzędu miasta',
    intro:
      'Kraków i jego podmiejskie gminy to domy na pagórkowatym terenie, często z widokiem, którego nie chce się zasłaniać. Dlatego krakowscy klienci najczęściej wybierają pergole lamelowe i dachy ze szkła.',
    local:
      'W Zabierzowie, Wieliczce czy Zielonkach budujemy wolnostojące pergole lamelowe w ogrodach na skarpach i zadaszenia przy tarasach na wysokim parterze. Na terenach o zróżnicowanym ukształtowaniu szczególną uwagę przykładamy do posadowienia słupów i odprowadzenia wody.',
    areas: ['Zabierzów', 'Wieliczka', 'Zielonki', 'Mogilany', 'Skawina', 'Niepołomice', 'Bronowice', 'Swoszowice'],
  },
  {
    slug: 'lodz',
    name: 'Łódź',
    locative: 'w Łodzi',
    region: 'województwo łódzkie',
    authority: 'Prezydent Miasta Łodzi – wydział architektury i budownictwa urzędu miasta',
    intro:
      'W Łodzi i okolicach dużo jest domów w zabudowie bliźniaczej i szeregowej, gdzie taras sąsiaduje z ogrodem sąsiada. Zadaszenie z zabudową boczną daje tu i ochronę przed pogodą, i prywatność.',
    local:
      'W Nowosolnej, Zgierzu czy Pabianicach projektujemy zadaszenia T-LINE dopasowane do szerokości segmentu, uzupełnione szklanymi ścianami przesuwnymi lub shuttersami od strony granicy działki.',
    areas: ['Nowosolna', 'Widzew', 'Polesie', 'Zgierz', 'Pabianice', 'Konstantynów Łódzki', 'Brzeziny', 'Stryków'],
  },
  {
    slug: 'wroclaw',
    name: 'Wrocław',
    locative: 'we Wrocławiu',
    region: 'województwo dolnośląskie',
    authority: 'Prezydent Wrocławia – wydział architektury i budownictwa urzędu miasta',
    intro:
      'Wrocław ma jeden z najdłuższych w Polsce sezonów tarasowych, a nowe osiedla domów pod miastem rosną bardzo szybko. Klienci szukają tu zadaszeń, które wydłużą korzystanie z ogrodu od marca do października.',
    local:
      'W Kiełczowie, Siechnicach czy Smolcu budujemy wolnostojące zadaszenia SKYLINE nad strefami jadalni oraz pergole tkaninowe nad tarasami od południa. Przy nasłonecznionych tarasach zawsze rozważamy markizę dachową.',
    areas: ['Krzyki', 'Psie Pole', 'Kiełczów', 'Siechnice', 'Smolec', 'Kobierzyce', 'Wysoka', 'Długołęka'],
  },
  {
    slug: 'poznan',
    name: 'Poznań',
    locative: 'w Poznaniu',
    region: 'województwo wielkopolskie',
    authority: 'Prezydent Miasta Poznania – wydział architektury i budownictwa urzędu miasta',
    intro:
      'W Poznaniu i gminach wokół miasta dominują domy jednorodzinne z ogrodami od strony południowej i zachodniej. Na takich tarasach dobrze sprawdza się poliwęglan lity – wygląda jak szkło, a lepiej znosi grad.',
    local:
      'W Suchym Lesie, Komornikach czy Swarzędzu projektujemy zadaszenia tarasów przy domach z lat 2000–2020, często z zabudową boczną z shuttersów w malowaniu drewnopodobnym, które ociepla nowoczesną bryłę.',
    areas: ['Suchy Las', 'Komorniki', 'Swarzędz', 'Dopiewo', 'Luboń', 'Tarnowo Podgórne', 'Kórnik', 'Czerwonak'],
  },
  {
    slug: 'gdansk',
    name: 'Gdańsk',
    locative: 'w Gdańsku',
    region: 'województwo pomorskie',
    authority: 'Prezydent Miasta Gdańska – wydział architektury i budownictwa urzędu miasta',
    intro:
      'Na Wybrzeżu taras trzeba chronić przede wszystkim przed wiatrem. W Gdańsku i całym Trójmieście proponujemy zadaszenia o podwyższonej nośności z pełną zabudową boczną.',
    local:
      'W Osowej, Kowalach czy Rumi dobieramy systemy T-LINE i SKYLINE z myślą o silnym wietrze, a szklane ściany przesuwne zamykają taras od strony najczęstszych podmuchów. Rolety współpracują z czujnikiem wiatru.',
    areas: ['Osowa', 'Oliwa', 'Kowale', 'Pruszcz Gdański', 'Sopot', 'Gdynia', 'Rumia', 'Żukowo'],
  },
  {
    slug: 'katowice',
    name: 'Katowice',
    locative: 'w Katowicach',
    region: 'województwo śląskie',
    authority: 'Prezydent Miasta Katowice – wydział architektury i budownictwa urzędu miasta',
    intro:
      'Śląsk to gęsta sieć miast i dzielnic domów jednorodzinnych – od Katowic po Gliwice i Tychy. Montujemy tu zadaszenia i pergole dla klientów z całej aglomeracji.',
    local:
      'W Ligocie, Mikołowie czy Tychach często zabudowujemy tarasy przy domach w zwartej zabudowie, gdzie liczy się prywatność. Proponujemy wtedy połączenie zadaszenia z shuttersami i roletami z tkaniny technicznej.',
    areas: ['Ligota', 'Podlesie', 'Mikołów', 'Tychy', 'Gliwice', 'Chorzów', 'Mysłowice', 'Bieruń'],
  },
  {
    slug: 'lublin',
    name: 'Lublin',
    locative: 'w Lublinie',
    region: 'województwo lubelskie',
    authority: 'Prezydent Miasta Lublin – wydział architektury i budownictwa urzędu miasta',
    intro:
      'Lublin i podlubelskie gminy to szybko rosnące osiedla domów z dużymi ogrodami. Klienci najczęściej łączą zadaszenie tarasu z pergolą w ogrodzie, tworząc dwie strefy wypoczynku.',
    local:
      'W Konopnicy, Świdniku czy Jakubowicach Konińskich budujemy zadaszenia SMART przy domach oraz pergole lamelowe w głębi ogrodu. Lublin leży blisko naszej siedziby, co skraca terminy pomiaru.',
    areas: ['Konopnica', 'Świdnik', 'Jakubowice Konińskie', 'Niemce', 'Głusk', 'Sławin', 'Felin', 'Wólka Abramowicka'],
  },
  {
    slug: 'kielce',
    name: 'Kielce',
    locative: 'w Kielcach',
    region: 'województwo świętokrzyskie',
    authority: 'Prezydent Miasta Kielce – wydział architektury i budownictwa urzędu miasta',
    intro:
      'Kielce i Góry Świętokrzyskie to domy na działkach z widokiem na wzgórza i lasy. Pergole szklane i zadaszenia z dachem ze szkła pozwalają cieszyć się tym widokiem także w deszczowe dni.',
    local:
      'W Masłowie, Morawicy czy Sitkówce-Nowinach budujemy zadaszenia i pergole na działkach o zróżnicowanym terenie. Kielce są blisko naszej siedziby w Radomiu – pomiar i montaż umawiamy w krótkim terminie.',
    areas: ['Masłów', 'Morawica', 'Sitkówka-Nowiny', 'Piekoszów', 'Zagnańsk', 'Miedziana Góra', 'Daleszyce', 'Chęciny'],
  },
];
