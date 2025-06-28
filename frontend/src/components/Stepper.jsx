import { FaCheckCircle } from 'react-icons/fa';
import styles from '../styles/Stepper.module.css';

const Stepper = ({ steps, step, saved }) => (
  <div className={styles.stepper}>
    {steps.map((stepObj, idx) => {
      let iconColor = 'var(--rbg-info)';
      if ((idx === 0 && step > 0) || (idx === 1 && saved)) {
        iconColor = 'var(--rbg-success)';
      } else if (idx === step) {
        iconColor = 'var(--rbg-accent-red)';
      }
      return (
        <div key={stepObj.label} className={`${styles.step} ${step === idx ? styles.active : ''} ${(step > idx || (idx === 1 && saved)) ? styles.done : ''}`}>
          <div className={styles.stepCircle} style={{ color: iconColor, borderColor: iconColor }}>
            {step > idx || (idx === 1 && saved) ? <FaCheckCircle color={iconColor} /> : stepObj.icon}
          </div>
          <div className={styles.stepLabel}>{stepObj.label}</div>
        </div>
      );
    })}
  </div>
);

export default Stepper; 