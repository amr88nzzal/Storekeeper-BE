'use strict';
const { Op } = require("sequelize");
class Collection {
  constructor(model, parent1Model = null, parent2Model = null, parent3Model = null, parent4Model = null, parent5Model = null) {
    this.model = model;
    this.parent1Model = parent1Model
    this.parent2Model = parent2Model
    this.parent3Model = parent3Model
    this.parent4Model = parent4Model
    this.parent5Model = parent5Model
  }
  async create(obj) {
    try {
      let newRecord = await this.model.create(obj);
      return newRecord;
    } catch (e) {
      console.error('error in creating new record for model', this.model, e.message)
    }
  }
  async read(id) {
    let record = [];
    try {
      if (id) {
        record[0] = await this.model.findOne({ where: { id } })
        if (!record[0])
          record[0] = `there is no record with id of ${id}`
      } else { record = await this.model.findAll() }
      return record;
    } catch (e) {
      console.error('error in reading record/s for model', this.model, e.message)
    }

  }
  async readWith1Relation(id) {
    let record = [];
    try {
      if (id) {
        record[0] = await this.model.findOne({ where: { id }, include: this.parent1Model })
        if (!record[0])
          record[0] = `there is no record with id of ${id} in ${model}`
      } else {
        record = await this.model.findAll({ include: this.parent1Model })
      }
      return record;
    } catch (e) {
      console.error('error in reading record/s for model', this.model)
    }

  }
  async readCustomer(id) {
    let record = [];
    try {
      if (id) {
        record = await this.model.findOne({
          where: { id }, include:
            [{ model: this.parent1Model },
            { model: this.parent2Model },
            {
              model: this.parent3Model, include:
                [
                  { model: this.parent4Model }
                ]
            }
            ]
        })
      } else {
        record = await this.model.findAll({
          include:
            [{ model: this.parent1Model },
            { model: this.parent2Model },
            {
              model: this.parent3Model, include:
                [{ model: this.parent4Model }]
            }
            ]
        })
      }
      return record;
    }
    catch (e) {
      console.error('error in reading record/s for model', this.model)
    }

  }
  async readTransaction(id) {
    let record = [];
    try {
      if (id) {
        record = await this.model.findOne({
          where: { id }, include:
            [{ model: this.parent1Model },
            {
              model: this.parent2Model, include:
                [{ model: this.parent1Model },
                { model: this.parent3Model },
                {
                  model: this.parent4Model, include:
                    [
                      { model: this.parent5Model }
                    ]
                }
                ]
            }]
        })
      } else {
        record = await this.model.findAll({
          include:
            [{ model: this.parent1Model },
            {
              model: this.parent2Model, include:
                [{ model: this.parent1Model },
                { model: this.parent3Model },
                {
                  model: this.parent4Model, include:
                    [
                      { model: this.parent5Model }
                    ]
                }
                ]
            }]
        })
      }
      return record;
    }
    catch (e) {
      console.error('error in reading record/s for model', this.model)
    }
  }
  async readTransactionByDate(from = null, to = null) {
    let record = [];
    let fromDate = from ? new Date(from) : 0;
    let toDate = to ? new Date(to) : new Date();
    toDate.setDate(to ? toDate.getDate() + 1 : toDate.getDate());
    try {
      record = await this.model.findAll({
        where: {
          trxStartDate: {
            [Op.gte]: fromDate ? fromDate : 0,
            [Op.lte]: toDate ? toDate : new Date()
          }
        }, include:
          [{ model: this.parent1Model },
          {
            model: this.parent2Model, include:
              [{ model: this.parent1Model },
              { model: this.parent3Model },
              {
                model: this.parent4Model, include:
                  [
                    { model: this.parent5Model }
                  ]
              }
              ]
          }]
      })
      return record;
    }
    catch (e) {
      console.error('error in reading record/s for model', this.model)
    }
  }
  async readTransactionByParam(column = null, value = null, options = 'eq') {
    let record = [];
    try {
      record = await this.model.findAll({
        where: {
          [column]: {
            [Op[options]]: value
          }
        }, include:
          [{ model: this.parent1Model },
          {
            model: this.parent2Model, include:
              [{ model: this.parent1Model },
              { model: this.parent3Model },
              {
                model: this.parent4Model, include:
                  [
                    { model: this.parent5Model }
                  ]
              }
              ]
          }]
      })

      return record;
    }
    catch (e) {
      console.error('error in reading record/s for model', this.model)
    }
  }
  async update(id, obj) {
    try {
      let recordId = await this.model.findOne({ where: { id } })
      let updateRecord = await recordId.update(obj);
      return updateRecord;
    } catch (e) {
      console.error('error in updating record for model', this.model, `id:${id}`)
    }
  }
  async delete(id) {
    try {
      let deletedRecord = await this.model.destroy({ where: { id: id } });
      return deletedRecord;
    } catch (e) {
      console.error('error in deleting record for model', this.model, `id:${id}`)
    }
  }
}

module.exports = Collection;