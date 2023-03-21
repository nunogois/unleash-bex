import { bexContent } from 'quasar/wrappers'
import { ISession } from 'src/stores/session'
import $ from 'jquery'

let isInteractive = false
let hideTimer: NodeJS.Timeout
const tooltipHeight = 200
const tooltipWidth = 200
const tooltipSpace = 4
const linkPadding = 4

const hide = () => {
  hideTimer = setTimeout(() => {
    $('#unleash-bex-tooltip').hide()
  }, 100)
}

const loadInteractivity = (session: ISession) => {
  $(`a[href^='${session.settings.url}']:not(.unleash-bex-link)`).each(
    function () {
      const link = $(this).attr('href')?.split(session.settings.url)[1]

      if (link?.match(/^\/projects\/[\w-]+\/features\/[\w-]+$/)) {
        // Feature toggle
        const project = link?.split('/projects/')[1].split('/features/')[0]
        const feature = link?.split('/features/')[1]
        $(this)
          .addClass('unleash-bex-link')
          .html(
            `<img src="https://www.getunleash.io/logos/unleash_glyph_pos.svg" /><span>${project} | ${feature}</span>`
          )
        $(this)
          .on('mouseover', function () {
            const project = link?.split('/projects/')[1].split('/features/')[0]
            const feature = link?.split('/features/')[1]
            clearTimeout(hideTimer)
            $('#unleash-bex-tooltip iframe').attr(
              'src',
              chrome.runtime.getURL(
                `www/index.html#/tooltip/toggle?project=${project}&feature=${feature}`
              )
            )
            const offset = $(this).offset()
            const scrollTop = $(window).scrollTop() ?? 0
            const scrollLeft = $(window).scrollLeft() ?? 0
            const height = $(this).height()
            const width = $(this).width()
            if (!offset || !width || !height) return

            const { top, left } = offset
            const tooltipTop =
              top - scrollTop < tooltipHeight + tooltipSpace
                ? top + height + linkPadding + tooltipSpace
                : top - tooltipHeight - tooltipSpace
            const tooltipLeft = left + scrollLeft + width / 2 - tooltipWidth / 2

            setTimeout(() => {
              $('#unleash-bex-tooltip')
                .css({
                  top: tooltipTop,
                  left: tooltipLeft < 0 ? 0 : tooltipLeft,
                })
                .show()
            }, 100)
          })
          .on('mouseout', function () {
            hide()
          })
      }
    }
  )

  setTimeout(() => loadInteractivity(session), 500)
}

;(function () {
  $('body').append('<div id="unleash-bex-tooltip"><iframe src=""/></div>')
  $('#unleash-bex-tooltip')
    .on('mouseover', function () {
      clearTimeout(hideTimer)
    })
    .on('mouseout', function () {
      hide()
    })
})()

export default bexContent((bridge) => {
  bridge.on('load', ({ data }) => {
    const session = data.session as ISession

    if (session?.settings.valid && !isInteractive) {
      isInteractive = true
      loadInteractivity(session)
    }
  })
})
