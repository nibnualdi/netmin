import styles from "./AddPopUpBody.module.css";

const AddPopUpBody = ({ data, username, setGetName, getDataUserAndFriend }) => {
  return (
    <>
      {data.map(
        (singgleData) =>
          singgleData.name !== username && (
            <div
              id={singgleData.name}
              key={singgleData.id}
              className={`${styles.container}`}
              onClick={(e) => {
                setGetName(singgleData.name);
                getDataUserAndFriend({ variables: { username, friendname: singgleData.name } });
              }}
            >
              <div className={styles.profileInitial}>{singgleData?.name[0].toUpperCase()}</div>
              <div title={singgleData?.name} className={styles.users}>
                {singgleData?.name}
              </div>
            </div>
          )
      )}
    </>
  );
};

export default AddPopUpBody;
