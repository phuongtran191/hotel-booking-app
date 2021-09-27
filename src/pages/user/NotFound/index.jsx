import React from 'react';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound(props) {
  const { t } = useTranslation();

  return (
    <>
      <Result
        status="404"
        title="404 - Page Not Found!"
        subTitle={t("Sorry, the page you visited does not exist.")}
        extra={
        <Button type="primary">
          <Link to="/">Back to Home</Link>
        </Button>
        }
      />
    </>
  );
}

export default NotFound;