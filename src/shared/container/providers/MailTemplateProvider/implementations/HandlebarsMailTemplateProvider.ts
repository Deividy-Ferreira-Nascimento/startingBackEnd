import Handlebars from 'handlebars';
import fs from 'fs'
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const templateFile = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })
    const parseTemplate = Handlebars.compile(templateFile)

    return parseTemplate(variables)

  }
}
