export default function EventDay( { setFirstDay } ) {
  return (
    <>
      <div className='eventDay'>
        <h3 onClick={() => {
          setFirstDay(true);
        }}>Sexta, 22/10</h3>
      </div>
    </>
  );
};
