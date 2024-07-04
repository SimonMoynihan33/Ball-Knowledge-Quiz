## Bugs
- Bug 1 

Cannot get options to show with questions when updating page
- fix 
variable of :

```
const choiceNumber = choice.dataset['number];
```

Needed to be changed to

```
const number = choice.dataset['number'];
```

- Bug 2 

Page must be refreshed in order to pick a new answer
- fix

``` 
function enableAnswering() {
    acceptingAnswers = true;
}
```
This function was not being called due to a spelling error ' function enableAnsweringAnswering () ' after I had changed it from ' allowAnswering() '

- Bug 3

Progress bar not updating with questions

- Fix 
```
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
  ```
  Was:
  ```
    progressBarFull.computedStyleMap.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
  ```

Changed by Emmet autofill when typing

- Bug 4 

Answer container changes to different size each time question is answered and updated

## Credits
- Photos 
- Youtube tutorial https://www.youtube.com/watch?v=f4fB9Xg2JEY&list=PLmEz6BxNwVPc-oP7rMw_oJ7yssN0jT844&index=2 By 'Brian Design'
- sports quiz photo https://www.scoopwhoop.com/sports/50-iconic-football-photos-from-through-the-ages-that-every-fan-needs-to-see/
- games quiz photo https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cnet.com%2Ftech%2Fgaming%2Fgod-of-war-ragnarok-is-bigger-better-and-less-memorable-than-its-predecessor%2F&psig=AOvVaw3xu_BN9iPzp8FkdisK9KOh&ust=1720102948747000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID1qP-Ii4cDFQAAAAAdAAAAABAK
- background soccer quiz https://www.pexels.com/photo/white-adidas-soccer-ball-on-grass-274506/