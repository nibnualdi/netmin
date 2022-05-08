import styles from "./AddPopUpBody.module.css";

const AddPopUpBody = ({ data }) => {
  return (
    <>
      {data.map((singgleData) => {
        return (
          <div
            id={singgleData.id}
            key={singgleData.id}
            className={`${styles.container}`}
            onClick={(e) => {
              console.log(e.currentTarget.id);
            }}
          >
            <div className={styles.profileInitial}>{singgleData?.name[0].toUpperCase()}</div>
            <div title={singgleData?.name} className={styles.users}>
              {singgleData?.name}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AddPopUpBody;
