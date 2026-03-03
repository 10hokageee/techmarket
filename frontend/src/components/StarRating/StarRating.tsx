import styles from './StarRating.module.scss';

type StarRatingProps = {
  rating: number;
};

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fillPercentage = (rating / 5) * 100;
  const stars = [1, 2, 3, 4, 5];

  const StarIcon = () => {
    return (
      <svg
        width={13}
        height={13}
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M5.98423 0.0544193C6.02139 -0.0181452 6.1251 -0.0181455 6.16225 0.054419L8.00246 3.64831C8.01699 3.67667 8.04416 3.69642 8.07563 3.70147L12.0623 4.34104C12.1428 4.35395 12.1748 4.45258 12.1173 4.51035L9.26796 7.37106C9.24547 7.39364 9.23508 7.42559 9.24001 7.45708L9.86368 11.4462C9.87627 11.5268 9.79237 11.5877 9.71966 11.5509L6.11846 9.72501C6.09004 9.7106 6.05645 9.7106 6.02802 9.72501L2.42683 11.5509C2.35411 11.5877 2.27021 11.5268 2.2828 11.4462L2.90648 7.45708C2.9114 7.42559 2.90102 7.39364 2.87853 7.37106L0.0291959 4.51035C-0.0283352 4.45258 0.00371212 4.35395 0.0842069 4.34104L4.07085 3.70147C4.10232 3.69642 4.1295 3.67667 4.14402 3.64831L5.98423 0.0544193Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <div className={styles.starRating}>
      <div className={styles.starRating__wrapper}>
        <div className={styles.starRating__bg}>
          {stars.map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>

        <div
          className={styles.starRating__foreground}
          style={{ width: `${fillPercentage}%` }}
        >
          {stars.map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};