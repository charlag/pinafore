import { ClientFunction as exec, Selector as $ } from 'testcafe'

export const settingsButton = $('nav a[aria-label=Settings]')
export const instanceInput = $('#instanceInput')
export const addInstanceButton = $('.add-new-instance button')

export const getUrl = exec(() => window.location.href)

export function getNthVirtualArticle (n) {
  return $(`.virtual-list-item[aria-hidden="false"] article[aria-posinset="${n}"]`)
}

export async function validateTimeline (t, timeline) {
  for (let i = 0; i < timeline.length; i++) {
    let status = timeline[i]
    if (status.content) {
      await t.expect(getNthVirtualArticle(i).find('.status-content p').innerText)
        .contains(status.content)
    }
    if (status.spoiler) {
      await t.expect(getNthVirtualArticle(i).find('.status-spoiler p').innerText)
        .contains(status.spoiler)
    }
    if (status.followedBy) {
      await t.expect(getNthVirtualArticle(i).find('.status-header span').innerText)
        .contains(status.followedBy + ' followed you')
    }
    if (status.rebloggedBy) {
      await t.expect(getNthVirtualArticle(i).find('.status-header span').innerText)
        .contains(status.rebloggedBy + ' boosted your status')
    }
    if (status.favoritedBy) {
      await t.expect(getNthVirtualArticle(i).find('.status-header span').innerText)
        .contains(status.favoritedBy + ' favorited your status')
    }

    // hovering forces TestCafé to scroll to that element: https://git.io/vABV2
    if (i % 3 === 2) { // only scroll every nth element
      await t.hover(getNthVirtualArticle(i))
      await t.expect($('.loading-footer').exist).notOk()
    }
  }
}
