-- Seed email prompts for Telc B1 practice
-- Based on authentic scenarios

INSERT INTO email_prompts (type, difficulty, scenario, sender, content, required_points) VALUES

-- FORMAL EMAILS (4)
('formal', 3, 'Applying for a volunteer position at a local library', 'Stadtbibliothek München', 
'Sehr geehrte Damen und Herren,

ich habe Ihre Anzeige für die ehrenamtliche Position in Ihrer Bibliothek in der Münchner Zeitung gelesen. Seit meiner Schulzeit interessiere ich mich sehr für Bücher und Literatur, und ich habe schon Erfahrung im Umgang mit Menschen. Da ich vor kurzem in Rente gegangen bin, möchte ich mich sozial engagieren und anderen helfen.

Ich würde gerne mehr über die spezifischen Aufgaben erfahren - zum Beispiel, ob ich bei der Ausleihe oder bei Veranstaltungen helfen könnte. Außerdem interessiert es mich, wie viele Stunden pro Woche erforderlich sind und wann die Stelle beginnen würde.

Mit freundlichen Grüßen
[Student must respond and introduce themselves]',
ARRAY[
  'Stellen Sie sich vor',
  'Erklären Sie, warum Sie sich für diese Tätigkeit interessieren',
  'Beschreiben Sie Ihre relevanten Fähigkeiten und Erfahrungen',
  'Teilen Sie Ihre zeitliche Verfügbarkeit mit'
]),

('formal', 2, 'Complaining about noisy neighbors in an apartment building', 'Hausverwaltung Müller', 
'Sehr geehrte Hausverwaltung,

seit fast drei Wochen gibt es nachts sehr laute Musik aus der Wohnung 4B in unserem Wohnblock. Das Problem tritt vor allem an den Wochenenden auf, oft bis ein oder zwei Uhr morgens. Die Musik ist so laut, dass die Wände vibrieren, und ich kann einfach nicht mehr schlafen. Einige andere Mieter haben sich bei mir beschwert, sie können ebenfalls nicht schlafen.

Ich habe bereits versucht, selbst mit den Bewohnern zu sprechen, aber sie öffnen die Tür nicht. Das ist wirklich unzumutbar, besonders weil ich jeden Tag früh zur Arbeit muss. Könnten Sie bitte endlich etwas dagegen unternehmen?

Mit freundlichen Grüßen
[Student must respond and explain the problem]',
ARRAY[
  'Beschreiben Sie das Problem',
  'Erklären Sie, wie dies Ihr Leben beeinträchtigt',
  'Bitten Sie um eine Lösung',
  'Erwähnen Sie, was passieren soll, wenn das Problem nicht gelöst wird'
]),

('formal', 4, 'Requesting information about a university course', 'Universität Heidelberg', 
'Sehr geehrte Damen und Herren,

ich habe von Ihrer Sprachschule gehört und bin sehr interessiert an Ihren Deutschkursen. Ich lerne seit einigen Jahren Deutsch und würde gerne mein Niveau verbessern, aber ich weiß nicht genau, welcher Kurs für mich am besten wäre.

Könnten Sie mir bitte Informationen zu folgenden Punkten schicken:
- Welche Sprachniveaus bieten Sie an und wie läuft die Einstufung?
- Wann beginnen die nächsten Kurse und wie lange dauern sie?
- Wie hoch sind die Gebühren und gibt es Ermäßigungen für Studenten?
- Was ist das Anmeldeverfahren und bis wann muss man sich melden?

Ich wäre sehr dankbar für eine Antwort.

Mit freundlichen Grüßen
[Student must respond with their language level]',
ARRAY[
  'Stellen Sie sich vor und nennen Sie Ihr Sprachniveau',
  'Fragen Sie nach Kurszeiten und Terminen',
  'Erkundigen Sie sich nach den Kosten',
  'Fragen Sie nach der Anmeldung'
]),

('formal', 3, 'Reporting a lost item on public transport', 'Münchner Verkehrsgesellschaft', 
'Sehr geehrte Damen und Herren,

ich wende mich an Sie, weil ich vor drei Tagen eine sehr wichtige Tasche in der U-Bahn verloren habe. Ich war am Dienstag, dem 12. März, gegen 18:30 Uhr auf dem Weg von der Arbeit und bin mit der U-Bahn Linie 6 von Schwabing zum Hauptbahnhof gefahren. In meiner Hektik habe ich die Tasche beim Aussteigen vergessen.

Die Tasche ist schwarz mit einem braunen Henkel und enthält sehr wichtige Dokumente - meinen Reisepass, mein Führerschein und einige persönliche Fotos. Es wäre wirklich schlimm, wenn diese Sachen weg wären. Könnten Sie bitte prüfen, ob die Tasche gefunden wurde? Falls ja, wie kann ich sie abholen?

Mit freundlichen Grüßen
[Student must respond with specific details]',
ARRAY[
  'Beschreiben Sie den Verlust',
  'Geben Sie Datum und ungefähre Uhrzeit an',
  'Beschreiben Sie die verlorene Tasche und deren Inhalt',
  'Bitten Sie um Rückruf oder Information'
]),

-- SEMI-FORMAL EMAILS (4)
('semi-formal', 2, 'Resigning from a tennis club membership', 'Tennisverein Berlin e.V.', 
'Hallo,

ich schreibe Ihnen, weil ich leider nicht mehr so oft zum Tennis kommen kann wie früher. Meine Arbeit hat sich in den letzten Monaten sehr verändert - ich muss jetzt oft abends arbeiten und habe auch mehr Verantwortung. Wenn ich nach Hause komme, bin ich einfach zu müde und habe keine Energie mehr für Sport.

Das tut mir wirklich sehr leid, denn ich habe hier so viele schöne Momente erlebt und tolle Leute kennengelernt. Aber leider geht es einfach nicht mehr anders. Ich habe auch überlegt, vielleicht nur noch am Wochenende zu kommen, aber selbst da ist es schwierig geworden.

Mit freundlichen Grüßen
[Student must respond about resignation]',
ARRAY[
  'Erklären Sie den Grund für Ihren Austritt',
  'Danken Sie dem Verein für die gemeinsame Zeit',
  'Fragen Sie nach dem Austrittsverfahren',
  'Möchten Sie die Mitgliedschaft zum Monatsende beenden'
]),

('semi-formal', 3, 'Organizing a neighborhood barbecue party', 'Nachbarschaftsgruppe Meier', 
'Hallo liebe Nachbarn!

ich hätte eine Idee für euch alle. Der Sommer ist so schön, und ich denke, es wäre wirklich schön, wenn wir uns alle besser kennenlernen würden. Wir wohnen hier schon seit ein paar Jahren, aber außer einem freundlichen "Guten Tag" im Treppenhaus haben wir noch nicht viel miteinander zu tun gehabt.

Wäre es nicht schön, wenn wir alle zusammen einen gemütlichen Grillabend organisieren würden? Ich könnte das Fleisch besorgen, und vielleicht könnten andere Salat oder Beilagen mitbringen. Was haltet ihr davon? Wir könnten das ja für einen Samstag im Juli planen, wenn das Wetter gut ist.

Beste Grüße
[Student must respond about organizing]',
ARRAY[
  'Schlagen Sie ein Datum und einen Ort vor',
  'Erklären Sie, was jeder mitbringen soll',
  'Fragen Sie nach Teilnahme und besonderen Wünschen',
  'Bitten Sie um Rückmeldung bis zu einem bestimmten Datum'
]),

('semi-formal', 2, 'Inviting colleagues to a farewell lunch', 'Kollegium Buchhandlung Schmidt', 
'Liebe Kolleginnen und Kollegen,

wie ihr bestimmt alle wisst, verlasse ich die Firma in zwei Wochen und bin dann in meinem neuen Job. Die letzten fünf Jahre hier waren wirklich schön, und ich habe so viele tolle Erinnerungen mit euch allen gesammelt - von den lustigen Mittagspausen bis zu unseren gemeinsamen Weihnachtsfeiern.

Bevor ich gehe, würde ich euch alle gerne nochmal sehen und mich bei euch für die gute Zusammenarbeit bedanken. Könnten wir vielleicht zusammen Mittagessen gehen? Ich denke, das wäre eine schöne Gelegenheit, um nochmal richtig zu quatschen und uns die Hände zu schütteln.

Liebe Grüße
[Student must respond about farewell lunch]',
ARRAY[
  'Erklären Sie den Grund für das Treffen',
  'Schlagen Sie einen Zeitpunkt und Ort vor',
  'Beschreiben Sie die Organisation (wer bringt was mit)',
  'Bitten Sie um Bestätigung der Teilnahme'
]),

('semi-formal', 3, 'Requesting help with moving furniture', 'Nachbarin Anna Müller', 
'Hallo Anna!

ich hätte eine große Bitte an dich. Ich habe mir endlich einen neuen Schreibtisch und ein Bücherregal bestellt, die ich schon lange brauchte. Die Möbel werden am nächsten Samstag geliefert, aber das Problem ist, dass ich sie dann vom Erdgeschoss in meine Wohnung im 3. Stock tragen muss. 

Ich weiß, dass du deine Ruhe liebst, aber könntest du mir vielleicht helfen? Meine Mutter war bei anderen Gelegenheiten immer dabei, aber diesmal kann sie leider nicht kommen. Es wäre auch nicht lange - vielleicht eine Stunde insgesamt. Als Dankeschön würde ich dich zum Mittagessen einladen.

Liebe Grüße
[Student must respond to request help]',
ARRAY[
  'Erklären Sie Ihr Anliegen',
  'Schlagen Sie einen Zeitpunkt vor',
  'Beschreiben Sie, was genau gebraucht wird',
  'Bieten Sie etwas als Dankeschön an'
]),

-- INFORMAL EMAILS (4)
('informal', 1, 'Apologizing for missing a friend''s birthday party', 'Liebe Maria', 
'Hi Maria!

tut mir wirklich super leid, dass ich nicht zu deiner Geburtstagsfeier kommen konnte! Ich weiß, dass ich dir versprochen hatte zu kommen, aber am selben Tag hatte ich plötzlich eine sehr wichtige Prüfung an der Uni, für die ich unbedingt lernen musste. Die Prüfung war letzte Woche angekündigt worden, und ich hatte sie total vergessen.

Ich hoffe so sehr, dass ihr trotzdem einen tollen Abend hattet und dass alle viel Spaß hatten! Herzlichen Glückwunsch nachträglich zu deinem Geburtstag! Würdest du Lust haben, wenn ich dich nächste Woche zum Essen einlade, um mit dir nachträglich zu feiern? Dann kann ich dir auch dein Geschenk geben, das ich schon seit Wochen für dich habe.

Viele liebe Grüße!
[Student must respond and apologize]',
ARRAY[
  'Entschuldigen Sie sich',
  'Erklären Sie den Grund',
  'Gratulieren Sie ihr zum Geburtstag',
  'Schlagen Sie ein Treffen vor, um nachträglich zu feiern'
]),

('informal', 2, 'Sharing vacation photos and experiences', 'Hallo Tom', 
'Hey Tom!

ich bin gestern aus Spanien zurückgekommen, und es war einfach fantastisch! Wir waren in Barcelona und haben eine wunderbare Woche gehabt. Das Wetter war perfekt - jeden Tag Sonnenschein und 28 Grad. Ich habe so viele schöne Orte gesehen: die Sagrada Familia, den Parc Güell, und natürlich das Meer. Die Strandtage waren der absolute Höhepunkt!

Die Stadt ist wirklich wunderschön und voller Leben. Überall gibt es Straßenmusiker, kleine Märkte und fantastisches Essen. Ich habe auch meinen Spanisch aufgefrischt, was viel Spaß gemacht hat.

Hier sind ein paar Fotos, die ich gemacht habe. [Student would see photos in real exam]

Viele Grüße
[Student must respond about vacation]',
ARRAY[
  'Erzählen Sie, wohin Sie gereist sind',
  'Beschreiben Sie eine besonders schöne Erfahrung',
  'Empfehlen Sie den Ort weiter',
  'Fragen Sie nach den Plänen Ihres Freundes für den Urlaub'
]),

('informal', 2, 'Asking for help with a computer problem', 'Hi Sarah', 
'Hey Sarah,

ich hätte eine große Bitte! Mein Computer macht mir seit ein paar Tagen total Probleme. Gestern hat er begonnen, ständig neu zu starten - ohne Vorwarnung geht einfach alles aus und dann startet er wieder von selbst. Das ist wirklich nervig, weil ich gerade eine wichtige Arbeit für die Uni schreibe und ständig Angst habe, meine Daten zu verlieren.

Ich habe schon alles Mögliche versucht: ich habe ihn komplett vom Strom getrennt, die Kabel überprüft, und sogar versucht, in den Sicherheitsmodus zu gehen, aber nichts hat geholfen. Das Seltsame ist, dass es manchmal funktioniert und dann plötzlich wieder einfach ausgeht.

Du kennst dich ja so gut mit Computern aus - könntest du dir das vielleicht mal ansehen? Vielleicht ist ja nur ein kleines Problem. Ich würde dir auch natürlich als Dankeschön etwas ausgeben!

Danke schon mal im Voraus!
[Student must respond and explain the problem]',
ARRAY[
  'Beschreiben Sie das Problem',
  'Erklären Sie, was Sie schon versucht haben',
  'Bitten Sie um Hilfe',
  'Schlagen Sie einen Termin für die Hilfe vor'
]),

('informal', 1, 'Inviting a friend to a cinema visit', 'Hey Peter', 
'Hey Peter!

wie geht es dir denn? Ich habe gestern die Trailer für einen neuen Actionfilm gesehen, der gerade im Kino läuft, und der sieht richtig gut aus! Es soll ein richtig spannender Film sein mit viel Action, und die Kritiken sind auch super positiv.

Ich hätte Lust, mir den Film anzusehen, aber alleine ins Kino gehen ist ja auch nicht so lustig. Hättest du Lust, mit mir hinzugehen? Wir könnten am Freitagabend gehen, wenn du Zeit hast - oder auch ein anderes Datum würde für mich passen. Ich kann die Karten online bestellen, wenn du willst.

Es wäre schön, dich mal wieder zu sehen! Wir haben ja schon lange nicht mehr miteinander geredet.

Bis bald!
[Student must respond to invite friend]',
ARRAY[
  'Erzählen Sie von dem Film',
  'Schlagen Sie einen Termin vor',
  'Erklären Sie, warum Sie den Film sehen möchten',
  'Fragen Sie, ob Ihr Freund Zeit und Lust dazu hat'
]);

