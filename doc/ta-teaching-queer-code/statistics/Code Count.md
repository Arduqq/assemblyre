```dataview
TABLE file.id, length(file.inlinks)
FROM "codes"
SORT length(file.inlinks) DESC
```