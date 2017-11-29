import FieldModel from "./Field";
import FormModel from "./Form";
import { mkReviews } from "./QuizCardView";

let MockCards = [
  new FieldModel("der Hund", "the dog", "fakeDeckID"),
  new FieldModel("das Kind", "the child", "fakeDeckID"),
  new FieldModel("die Frau", "the woman", "fakeDeckID"),
  new FieldModel("die Katze", "the cat", "fakeDeckID")
];

let MockCard = MockCards[0];
let MockReviews = mkReviews(MockCards);
let MockForms = [
    new FormModel("ReportFormA", 1),
    new FormModel("ReportFormB", 2),
    new FormModel("ReportFormC", 3),
    new FormModel("ReportFormD", 4),
    new FormModel("ReportFormE", 5),
    new FormModel("ReportFormF", 6),
    new FormModel("ReportFormG", 7),
    new FormModel("ReportFormH", 8),
    new FormModel("ReportFormI", 9),
    new FormModel("ReportFormJ", 10),
];

MockForms.map(deck => {
  deck.addField(new FieldModel("der Hund", "the dog", deck.formID));
  deck.addField(new FieldModel("die Katze", "the cat", deck.formID));
  deck.addField(new FieldModel("das Brot", "the bread", deck.formID));
  deck.addField(new FieldModel("die Frau", "the woman", deck.formID));
  return deck;
});

let MockForm = MockForms[0];

export { MockReviews, MockCards, MockCard, MockForms, MockForm };
