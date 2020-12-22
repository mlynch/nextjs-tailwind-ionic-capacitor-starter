import classNames from 'classnames';

const Icon = ({ icon, ...props }) => {
  const svg = icon.replace('data:image/svg+xml;utf8,', '');
  return (
    <div
      {...props}
      className={classNames('ui-icon', {
        'ion-icon': true,
        'ion-color': true,
        [props.className]: true,
      })}
    >
      <div className="icon-inner" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};

export default Icon;
