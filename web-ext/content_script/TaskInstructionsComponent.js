class TaskInstructionsComponent extends UIComponent {
  constructor(model) {
    super(model);
  }

  //This is not the right hook to do this. Need a new one
  render() {
    super.render();
    if (!this.model.startTime || this.model.paused) {
      this.showOverlay();
    }
  }

  buildComponent() {
    const me = this;
    let tracker = $(
      '<div id="tracker"><span id="trackerInstructions">' +
        this.model.instructions +
        "</span> </div>"
    );
    this.addButton(
      tracker,
      "startButton",
      browser.i18n.getMessage("startTaskButtonTest"),
      () => {
        me.startTask();
      },
      !me.model.startTime
    );
    this.addButton(
      tracker,
      "pauseButton",
      browser.i18n.getMessage("pauseTaskButtonTest"),
      () => {
        me.pauseTask();
      },
      me.model.startTime && !me.model.paused
    );
    this.addButton(
      tracker,
      "resumeButton",
      browser.i18n.getMessage("resumeTaskButtonTest"),
      () => {
        me.resumeTask();
      },
      me.model.paused
    );
    this.addButton(
      tracker,
      "endButton",
      browser.i18n.getMessage("finishTaskButtonTest"),
      () => {
        me.finishTask();
      },
      me.model.startTime && !me.model.paused
    );
    if ((this.model.completionChoices = "#doneOrAbandon")) {
      this.addButton(
        tracker,
        "abandonButton",
        browser.i18n.getMessage("abandonTaskButtonTest"),
        () => {
          me.abandonTask();
        },
        me.model.startTime && !me.model.paused
      );
    }
    return tracker;
  }

  startTask() {
    this.model.paused = false;
    this.model.startTime = new Date().getTime();
    this.model.ellapsedMs = 0;
    this.setModel(this.model);
  }

  pauseTask() {
    this.model.paused = true;
    this.model.ellapsedMs += new Date().getTime() - this.model.startTime;
    this.setModel(this.model);
  }

  resumeTask() {
    this.model.paused = false;
    this.model.startTime = new Date().getTime();
    this.setModel(this.model);
  }

  finishTask() {
    this.model.paused = false;
    this.model.ellapsedMs += new Date().getTime() - this.model.startTime;
    this.model.finished = true;
    this.model.abandoned = false;
    this.model.successful = eval(this.model.successCondition);
    this.submitResults();
    this.done();
  }

  abandonTask() {
    this.model.paused = false;
    this.model.ellapsedMs += new Date().getTime() - this.model.startTime;
    this.model.finished = false;
    this.model.abandoned = true;
    this.model.successful = eval(this.model.successCondition);
    this.submitResults();
    this.done();
  }

  addButton(tracker, id, text, func, show) {
    let button = $("<input/>", {
      value: text,
      class: "tracker-button",
      type: "submit",
      id: id
    });
    tracker.append(button);
    if (!show) {
      button.hide();
    }
    tracker.append(" ");
    tracker.on("click", "#" + id, func);
  }
}
