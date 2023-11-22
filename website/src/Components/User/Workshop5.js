import styles from "./Workshop5.module.css";
/* test */
const Workshop5 = () => {
  return (
    <div className={styles.workshop5}>
      <div className={styles.fee}>
        <div className={styles.attend}>
          <div className={styles.attendChild} />
          <div className={styles.attendWorkshop}>Attend Workshop</div>
        </div>
        <div className={styles.contentOfWorkshopContainer}>
          <p className={styles.contentOfWorkshop}>Content of workshop</p>
          <p className={styles.contentOfWorkshop}>-</p>
          <p className={styles.contentOfWorkshop}>-</p>
          <p className={styles.contentOfWorkshop}>-</p>
          <p className={styles.contentOfWorkshop}>-</p>
        </div>
        <div className={styles.dayDateTime}>Day date, time</div>
        <div className={styles.rs}>
          <span>400</span>
          <span className={styles.rs1}>Rs</span>
        </div>
      </div>
      <div className={styles.nameDis}>
        <h1 className={styles.workshopName}>Workshop Name</h1>
        <div className={styles.loremIpsumIsContainer}>
          <p className={styles.contentOfWorkshop}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <p className={styles.itWasPopularised}>
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsu
          </p>
        </div>
      </div>
      <div className={styles.video}>
        <div className={styles.videoChild} />
        <div className={styles.video1}>video</div>
      </div>
      <div className={styles.title}>
        <b className={styles.texephyrWorkshops}>TEXEPHYR WORKSHOPS</b>
      </div>
    </div>
  );
};

export default Workshop5;
