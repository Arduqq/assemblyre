
```dataview
TABLE length(file.inlinks) as "Codes", file.outlinks as "Themes"
FROM "codes"
SORT file.outlinks DESC
```
