import connect from "utils/connector.js";
import plainList from "utils/list.js";

export default function PrepTest() {
  const list = async () => {
    const info = await connect.fetchInfo();
    if (info == undefined) {
      return <div>loading</div>;
    } else {
      return plainList(info, "fin", "eng", "-");
    }
  };

  return list();
}
