import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import style from './TermsOfUse.module.scss';

import { CheckIcon } from '../Icons';

const cx = classNames.bind(style);

function TermsOfUse() {
  const { t } = useTranslation();

  // Danh sách các điều khoản
  const terms = [
    {
      title: t('termsOfUse.title1'),
      content: t('termsOfUse.content1'),
    },
    {
      title: t('termsOfUse.title2'),
      content: t('termsOfUse.content2'),
    },
    {
      title: t('termsOfUse.title3'),
      content: t('termsOfUse.content3'),
    },
    {
      title: t('termsOfUse.title4'),
      content: t('termsOfUse.content4'),
    },
    {
      title: t('termsOfUse.title5'),
      content: t('termsOfUse.content5'),
    },
    {
      title: t('termsOfUse.title6'),
      content: t('termsOfUse.content6'),
    },
    {
      title: t('termsOfUse.title7'),
      content: t('termsOfUse.content7'),
    },
    {
      title: t('termsOfUse.title8'),
      content: t('termsOfUse.content8'),
    },
    {
      title: t('termsOfUse.title9'),
      content: t('termsOfUse.content9'),
    },
  ];

  return (
    <div className={cx('terms-of-use')}>
      <ol className={cx('')}>
        {terms.map((term, index) => (
          <li key={index}>
            <div>
              <CheckIcon className={cx('check-icon')} />
            </div>
            <div>
              <strong>{term.title}:</strong> {term.content}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TermsOfUse;
