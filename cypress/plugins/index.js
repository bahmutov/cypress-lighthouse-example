const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse')

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions)
  })

  on('task', {
    async lighthouse(allOptions) {
      let txt
      // calling the function is important
      const lighthouseTask = lighthouse((lighthouseReport) => {
        let lighthouseScoreText = ''
        let lighthouseResult = lighthouseReport?.lhr?.categories
        let lighthousePerformance =
          'Performance: ' + lighthouseResult?.performance?.score + '\n'
        let lighthouseAccessibility =
          'Accessibility: ' + lighthouseResult?.accessibility?.score + '\n'
        let lighthouseBestPractices =
          'Best Practices: ' +
          lighthouseResult?.['best-practices']?.score +
          '\n'
        let lighthouseSEO = 'SEO: ' + lighthouseResult?.seo?.score + '\n'
        lighthouseScoreText =
          lighthousePerformance +
          lighthouseAccessibility +
          lighthouseBestPractices +
          lighthouseSEO

        console.log(lighthouseScoreText)
        txt = lighthouseScoreText
      })

      const report = await lighthouseTask(allOptions)
      // insert the text into the report returned the test
      report.txt = txt
      return report
    },
  })
}
