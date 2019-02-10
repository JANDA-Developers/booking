const handleDayMouseEnter = (day) => {
  const { from, to } = this.state;
  if (!this.isSelectingFirstDay(from, to, day)) {
    this.setState({
      enteredTo: day,
    });
  }
};

export default handleDayMouseEnter;
