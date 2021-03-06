rendering-tasks-prototypes
renderAvailableTaskPrototypesOn: html
	| headerBlock tableBlock |
	html heading
		level: 2;
		with: 'Available task prototypes'.
	headerBlock := [ html tableHeading: 'Type'.
	html tableHeading: 'Notes'.
	html tableHeading: ''].
	tableBlock := [ html tableHead: headerBlock.
	html tableBody: [ self store prototypes do: [ :each | self renderTaskPrototype: each on: html ] ] ].
	html tbsTable: tableBlock