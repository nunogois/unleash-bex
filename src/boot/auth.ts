import { boot } from 'quasar/wrappers'
import { useSession } from 'stores/session'

export default boot(({ router, redirect }) => {
  const session = useSession()

  router.beforeEach((to, _, next) => {
    if (!session.settings.valid && to.path !== '/settings') {
      redirect('/settings')
    } else {
      next()
    }
  })
})
