<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="utf-8" />

    <xsl:template match="/">
        <div id="reader">
            <xsl:apply-templates />
        </div>
    </xsl:template>

    <xsl:template match="backup">
        <h2 class="backup-owner">
            <xsl:value-of select="@nick" />
        </h2>
        <div>yedek tarihi: <xsl:value-of select="translate(@backupdate,'T', ' ')" /></div>

        <hr />

        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="p">
        <br/>
        <br/>
    </xsl:template>

    <xsl:template match="gbkz">
        <a><xsl:attribute name="href">https://eksisozluk.com/?q=<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="."/></a>
    </xsl:template>

    <xsl:template match="bkz">
        <a><xsl:attribute name="href">https://eksisozluk.com/?q=<xsl:value-of select="."/></xsl:attribute>(bkz: <xsl:value-of select="."/>)</a>
    </xsl:template>

    <xsl:template match="abkz">
        <xsl:value-of select="@text"/>
        <a>
            <xsl:attribute name="href">https://eksisozluk.com/?q=<xsl:value-of select="."/></xsl:attribute>
            <xsl:value-of select="@query" />
        </a>
    </xsl:template>

    <xsl:template name="entry">
        <xsl:param name="title" />
        <xsl:param name="date" />
        <xsl:param name="draftClass" />

        <div class="entry">
            <h3>
                <a>
                    <xsl:attribute name="href">https://eksisozluk.com/?q=<xsl:value-of
                            select="$title" /></xsl:attribute>
                    <xsl:value-of select="$title" />
                </a>
            </h3>
            <pre><xsl:attribute name="class"><xsl:value-of select="$draftClass"/></xsl:attribute>
                <xsl:apply-templates />
            </pre>
            <div class="aul">
                <a>
                    <xsl:attribute name="href">https://eksisozluk.com/?q=@<xsl:value-of
                            select="/backup/@nick" /></xsl:attribute>
                    <xsl:value-of select="/backup/@nick" />
                </a>
                <br />
                <xsl:value-of select="translate($date, 'T', ' ')" />
            </div>
        </div>
    </xsl:template>

    <xsl:template match="entry">
        <xsl:call-template name="entry">
            <xsl:with-param name="title" select="@title" />
            <xsl:with-param name="date" select="@date" />
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="drafts">
        <h2>kenarda duranlar (<xsl:value-of select="@count" />)</h2>

        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="draft">
        <xsl:call-template name="entry">
            <xsl:with-param name="title" select="@title" />
            <xsl:with-param name="date" select="@date" />
            <xsl:with-param name="draftClass">draft</xsl:with-param>
        </xsl:call-template>
    </xsl:template>
</xsl:stylesheet>