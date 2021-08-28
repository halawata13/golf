import React from 'react';
import { ConfigService } from '../services/config.service';
import { useForm } from 'react-hook-form';
import styles from './config-form.module.scss';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../states/modal.state';

interface FormValues {
  colNum: string;
  rowNum: string;
}

export const ConfigForm: React.VFC = () => {
  const configValues = ConfigService.load();
  const setModalState = useSetRecoilState(modalState);
  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      colNum: String(configValues.colNum),
      rowNum: String(configValues.rowNum),
    }
  });

  const onCancel = () => {
    setModalState({ show: false });
  };

  const onSubmit = (data: FormValues) => {
    ConfigService.save({
      colNum: Number(data.colNum),
      rowNum: Number(data.rowNum),
    });

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <dl className={styles.row}>
        <dt className={styles.label}>行の数</dt>
        <dd className={styles.value}>
          <input type={'number'} min={1} max={7} {...register('rowNum', { min: 1, max: 7 })} className={styles.input} />
          {errors.rowNum && (
            <span>正しい数値を入力してください</span>
          )}
        </dd>
      </dl>
      <dl className={styles.row}>
        <dt className={styles.label}>列の数</dt>
        <dd className={styles.value}>
          <input type={'number'} min={1} max={7} {...register('colNum', { min: 1, max: 7 })} className={styles.input} />
          {errors.colNum && (
            <span>正しい数値を入力してください</span>
          )}
        </dd>
      </dl>
      <div className={styles.btnRow}>
        <button type={'button'} className={styles.cancel} onClick={() => onCancel()}>キャンセル</button>
        <button type={'submit'} className={styles.save}>保存する</button>
      </div>
    </form>
  );
};
