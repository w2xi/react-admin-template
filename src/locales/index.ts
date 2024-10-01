import { useIntl } from 'react-intl';
import zhCN from './zh_CN'
import enUS from './en_US'
import type { MessageDescriptor } from 'react-intl';

export const localeConfig = {
  zh_CN: zhCN,
  en_US: enUS,
}

type Id = keyof typeof enUS;

interface Props extends MessageDescriptor {
  id: Id
}

type FormatMessageProps = (descriptor: Props) => string;

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  const formatMessage: FormatMessageProps = _formatMessage;

  return {
    ...rest,
    formatMessage,
  };
};