# baanstudio 2021

```
-- project

field_year
field_venue
field_client
field_artist_link => link field
field_curator
field_project_medias => views
```

```sql
SELECT
	n.nid
	, n.title
	, n.created
	, n.changed
	, r.body
	, p.field_year_value AS 'year'
	, p.field_venue_value AS 'venue'
	, p.field_client_value AS 'client'
	, (
		SELECT
			GROUP_CONCAT(
				IF(a.field_artist_link_url IS NULL OR TRIM(a.field_artist_link_url) != '',
					CONCAT('[', a.field_artist_link_title, '](', a.field_artist_link_url , ')'),
					a.field_artist_link_title
				)
			)
		FROM
			content_field_artist_link a
		WHERE
			a.nid = n.nid
		GROUP BY nid
		
	) AS 'artists'
	, p.field_curator_value AS 'curator'
FROM
	node n
	LEFT OUTER JOIN content_type_project p ON n.nid = p.nid
	LEFT OUTER JOIN node_revisions r ON n.nid = r.nid
WHERE
	n.type = 'project'
ORDER BY
	p.field_year_value DESC;
```