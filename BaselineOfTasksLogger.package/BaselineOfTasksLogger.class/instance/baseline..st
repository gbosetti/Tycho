baseline
baseline: spec
	<baseline>
	spec
		for: #common
		do: [ self
				seaside: spec;
				bootstrap: spec;
				neoJSON: spec.
			spec
				package: 'TasksLogger'
				with: [ spec requires: #('Seaside3' 'Seaside-REST-Core' 'Bootstrap' 'NeoJSON') ].
			spec postLoadDoIt: #postLoadActions ]