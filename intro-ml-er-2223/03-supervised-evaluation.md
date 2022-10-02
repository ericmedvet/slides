- what to evaluate: model (f_predict) or learning technique (f_learn) or ML system
  - say that system is from D to f_predict, same for f_learn, so methods and metrics are the same
  - say that D to f_predict is good if f_predict is good, so we'll start from that
- axes of evaluation: effectiveness, efficiency (more broadly, cost), explainability
  - table with model, learning technique as cols and axes as rows: natural language questions in each row

- limit case to supervised learning, templated technique, that is, evaluating effectiveness a model
- premise: recall model of what and introduce system to be modeled
- say we do not have tge system, but we can obtain some data (x,y pairs) about how it works
- hence simple idea: take the model, apply it to the data, measure the error; sketch f_assess_model as a block
- say we'll see a few options for binary/multiclass classification and for regression

- start with binary classification: recall all measures are taken on a pair m, D
  - discuss representativeness of D with respect to modeled system
- accuracy, classification error
- introduce positives, negatives
- table with all binary classification indexes: fpr, fnr, precision, recall, sensitivity, specificity
- why accuracy alone is not meaningful: unbalanced data

- $f(x)$ as a distribution over decision instead of decision
- how to obtain decision from distribution
  - sketch on how to make the opposite: (dirac) distribution from decision
- eer
- roc, auc
- influence of knowledge of cost of errors on choice of eval indexes

- boundaries for accuracy
- random classifier, most frequent class classifier, introduce *bayes classifier* in the context of classification: say it does errors even if perfect
- discuss bayes, its error, and their relation with $x$ with respect to the actual entity
- introduce the concept and the need for *baselines*

- multiclass case: accuracy, weighted accuracy

- from comparing models to comparing learning techs
- say: as we took many x,y pairs for assessing a model, we should take many D to assess a f_learn; sketch f_assess_learn as a block
- unseen data, data of tomorrow, D different that learning, *test dataset*
- static learn/test division
- k-fold cross validation, loocv, discusse effectiveness/efficiency trade-off

- comparing models/param values
- mean and stdev of many execs
- motivation and brief sketch statistical significance tests
