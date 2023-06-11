import Status from '~/src/components/Player/Status/Status'

export default function NotFoundView () {
  return <main>
    <Status
      stage='fail'
      details={['404', 'Page Not Found']}
    />
  </main>
}
