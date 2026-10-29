/**
 * Exports data to an Excel-compatible XML spreadsheet file.
 * Compatible with Microsoft Excel, Apple Numbers, and Google Sheets.
 */
export function exportExcel(filename: string, rows: Record<string, string>[]) {
  if (!rows || rows.length === 0) return

  const keys = Object.keys(rows[0] || {})
  
  const escapeXml = (value: string | number | undefined | null) => 
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  const worksheet = `
    <Worksheet ss:Name="CRM Export">
      <Table>
        <Row>
          ${keys.map((key) => `<Cell><Data ss:Type="String">${escapeXml(key)}</Data></Cell>`).join('')}
        </Row>
        ${rows
          .map(
            (row) => `
          <Row>
            ${keys.map((key) => `<Cell><Data ss:Type="String">${escapeXml(row[key] || '')}</Data></Cell>`).join('')}
          </Row>`
          )
          .join('')}
      </Table>
    </Worksheet>
  `

  const workbook = `<?xml version="1.0"?>
    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
      <Styles>
        <Style ss:ID="Default">
          <Alignment ss:Vertical="Center" />
        </Style>
      </Styles>
      ${worksheet}
    </Workbook>`

  const blob = new Blob([workbook], { type: 'application/vnd.ms-excel;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename.endsWith('.xls') ? filename : `${filename}.xls`
  anchor.click()
  URL.revokeObjectURL(url)
}
