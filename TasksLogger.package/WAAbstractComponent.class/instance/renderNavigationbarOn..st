rendering
renderNavigationbarOn: html
	html tbsNavbar
		beDefault;
		with: [ html
				tbsContainer: [ html
						tbsNavbarHeader: [ html image
								tbsPullLeft;
								style: 'padding: 10px;';
								url: WAExperimentFileLibrary / #notebooksmallPng.
							html tbsNavbarBrand with: 'Tycho' ].
					self renderReturnButtonOn: html ] ]