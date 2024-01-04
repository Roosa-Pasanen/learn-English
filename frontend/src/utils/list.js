const plainList = (l, end1, end2, s) => {
  let fullList = [];
  for (let i = 0; i < l.length; i++) {
    const temp = (
      <div key={i}>
        {l[i].end1} {s} {l[i + 1].end2}
      </div>
    );
    fullList.push(temp);
  }
  return fullList;
};
