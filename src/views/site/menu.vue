<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Application
          <v-btn class="float-right" icon color="primary">
            <v-icon @click="drawer = false">mdi-license</v-icon></v-btn
          >
        </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="(item, i) in items"
        :key="i"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn @click.stop="openDialogItem(i)" icon color="success"
              ><v-icon>mdi-connection</v-icon></v-btn
            >
          </v-list-item-action>
        </template>

        <v-list-item
          v-for="(subItem, j) in item.subItems"
          :key="j"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ subItem.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item @click="openDialogItem(-1)">
        <v-list-item-icon><v-icon>mdi-plus-circle</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>PLUS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog
      v-model="dialogItem"
      scrollable
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
      hide-overlay
    >
      <v-card>
        <v-card-title primary-title>
          headline
          <v-spacer></v-spacer>
          <v-btn @click="saveItem" icon color="success">
            <v-icon>mdi-swap-vertical</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <!-- <v-row>
            <v-col class="d-flex justify-center" cols="2"
              ><v-icon>{{ formItem.icon }}</v-icon></v-col
            >
            <v-col cols="10"
              ><v-text-field
                hide-details="auto"
                required
                maxLength="25"
                :rules="rules"
                counter="25"
                v-model="formItem.icon"
                name="name"
                label="mdi ICON"
                requiredO
                clearable
                id="id"
              ></v-text-field
            ></v-col>
          </v-row> -->

          <v-row>
            <v-col class="d-flex justify-center" cols="2"
              ><v-icon>{{ formItem.icon }}</v-icon></v-col
            >
            <v-col cols="10">
              <v-col class="d-flex">
                <v-select
                  v-model="formItem.icon"
                  :items="selectItems"
                  label="Outlined style"
                ></v-select>
              </v-col>
            </v-col>
          </v-row>
          <v-text-field
            @keypress.enter="saveItem"
            v-model="formItem.title"
            label="이름"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["items"],

  data: () => ({
    selectItems: [
      "mdi-information-variant",
      "mdi-account-arrow-right",
      "mdi-medal-outline",
      "mdi-kabaddi",
    ],
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    dialogItem: !false,
    dialogSubItem: false,
    formItem: {
      title: "",
      icon: "mdi-information-variant",
    },
    selectedItemIndex: -1,
  }),
  methods: {
    openDialogItem(idx) {
      this.selectedItemIndex = idx;
      this.dialogItem = true;
      this.formItem.title = idx < 0 ? "" : this.items[idx].title;
    },

    saveItem() {
      if (this.selectedItemIndex < 0) {
        this.items.push({ ...this.formItem });
      } else {
        this.items[this.selectedItemIndex] = {
          ...this.items[this.selectedItemIndex],
          ...this.formItem,
        };
      }
      this.save();
    },
    async save() {
      const db = this.$firebase_.getDatabase();
      const ref = this.$firebase_.ref;
      // const set = this.$firebase_.set;
      const update = this.$firebase_.update;
      const _ref = ref(db, "site/menu/"); //마지막슬래시 유무사오간없음

      const updates = {
        [this.selectedItemIndex]: { ...this.formItem },
      };
      await update(_ref, updates);
      this.dialogItem = false;
    },
  },
};
</script>

<style></style>
