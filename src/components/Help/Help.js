import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import style from './Help.module.scss';

const cx = classNames.bind(style);

function Help() {
  const { t } = useTranslation();

  return (
    <div className={cx('help')}>
      <h2 className={cx('title')}>{t('help.title01')}</h2>
      <p className={cx('first-p')}>{t('help.content01')}</p>

      <h3 className={cx('title')}>{t('help.title02')}</h3>
      <ul>
        <li>
          <p>
            <strong className={cx('strong')}>{t('help.strong01')}</strong>
            {t('help.content02.1')}
            <Link to={'/about/haui-food'}>{t('help.here')}</Link>
            {t('help.content02.2')}
          </p>
        </li>
        <li>
          <p>
            <strong className={cx('strong')}>{t('help.strong02')}</strong> {t('help.content03')}{' '}
            <a href="mailto:info.hauifood@gmail.com">info.hauifood@gmail.com</a>.
          </p>
        </li>
      </ul>

      <h3 className={cx('title')}>{t('help.title03')}</h3>
      <ol>
        <li>
          <p>
            <strong className={cx('strong')}>{t('help.strong03')}</strong>
            {t('help.content04')}
          </p>
        </li>
        <li>
          <p>
            <strong className={cx('strong')}>{t('help.strong04')}</strong>
            {t('help.content05')}
          </p>
        </li>
        <li>
          <p>
            <strong className={cx('strong')}>{t('help.strong05')}</strong>
            {t('help.content06')}
          </p>
        </li>
        <li>
          <p>
            <strong className={cx('strong')}>{t('help.strong06')}</strong>
            {t('help.content07')}
          </p>
        </li>
      </ol>
    </div>
  );
}

export default Help;
